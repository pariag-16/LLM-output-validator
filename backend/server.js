require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { z } = require("zod");
const fs = require("fs");

const app = express();
app.use(cors());

const UserSchema = z.object({
    name: z.string(),
    age: z.number()
});
const ProductSchema = z.object({
    productName: z.string(),
    price: z.number(),
    inStock: z.boolean()
});
const schemas = {
    user: UserSchema,
    product: ProductSchema
};

app.use(express.json());

app.get("/", (req, res) => {
    res.send("LLM Validator API Running");
});

app.post("/generate", async (req, res) => {

    try {
    
        const startTime = Date.now();
        const userPrompt = req.body.prompt;
        const schemaName = req.body.schema;

const selectedSchema = schemas[schemaName];

const prompt = `
Return ONLY valid JSON.

${schemaName === "user"
? `
Format:
{
  "name": "Alice",
  "age": 25
}
`
: `
Format:
{
  "productName": "Laptop",
  "price": 50000,
  "inStock": true
}
`
}

User Request:
${userPrompt}
`;
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

       
        const output =
    response.data.choices[0].message.content;
    const tokensUsed =
    response.data.usage.total_tokens;

try {

    const parsedOutput = JSON.parse(output);

    const selectedSchema = schemas[req.body.schema];

let attempts = 0;
let validated = false;
let validatedData;

while (attempts < 3 && !validated) {

    try {

        validatedData =
            selectedSchema.parse(parsedOutput);

        validated = true;

    } catch (validationError) {

        attempts++;

        console.log(`Attempt ${attempts} failed`);

        if (attempts >= 3) {
            throw validationError;
        }

    }
}

res.json({
    success: true,
    validatedData,
    attempts: attempts + 1,
    latency: `${Date.now() - startTime} ms`,
    tokensUsed
});

} catch (validationError) {

    console.log("Validation Failed");
    const logs =
    JSON.parse(fs.readFileSync("logs.json"));

logs.push({
    prompt: userPrompt,
    failedOutput: output,
    error: validationError.message,
    timestamp: new Date(),
    corrected: true
});

fs.writeFileSync(
    "logs.json",
    JSON.stringify(logs, null, 2)
);

    const correctionPrompt = `
    Your previous response failed validation.

    Error:
    ${validationError.message}

    Expected format:
    {
      "name": "string",
      "age": number
    }

    Return ONLY valid JSON.
    `;

    const retryResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: correctionPrompt
                }
            ]
        },
        {
            headers: {
                "Authorization":
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    const retryOutput =
        retryResponse.data.choices[0].message.content;

    const retryParsed =
        JSON.parse(retryOutput);

    const retryValidated =
        selectedSchema.parse(retryParsed);

    res.json({
        success: true,
        validatedData: retryValidated,
        attempts: 2,
        corrected: true
    });

}

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});
app.get("/metrics", (req, res) => {

    const logs =
        JSON.parse(fs.readFileSync("logs.json"));

    const totalFailures = logs.length;

    const totalCorrections =
        logs.filter(log => log.corrected).length;

    res.json({
        totalFailures,
        totalCorrections,
        successRate:
            `${100 - totalFailures * 10}%`
    });

});
app.get("/failures", (req, res) => {

    const logs =
        JSON.parse(fs.readFileSync("logs.json"));

    res.json({
        totalFailures: logs.length,
        failures: logs
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});