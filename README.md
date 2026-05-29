# LLM Output Validator Dashboard

## Project Overview

The LLM Output Validator Dashboard is a web-based application that validates AI-generated responses against predefined schemas and monitors validation performance through an interactive dashboard.

The system ensures that Large Language Model (LLM) outputs follow a required structure and provides real-time visibility into failures, corrections, token usage, latency, and validation success rates.

---

## Features

- Prompt-based AI response generation.
- Schema-based output validation.
- Automatic validation failure detection.
- Retry and correction workflow.
- Failure logging and monitoring.
- Success rate tracking.
- Token usage monitoring.
- API latency measurement.
- Interactive dashboard visualization.
- JSON output display.
- System health monitoring.
- Responsive user interface.

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Visualization
- Chart.js

---

## Project Workflow

1. User enters a prompt.
2. Frontend sends request to backend API.
3. Backend generates an AI response.
4. Response is validated against the selected schema.
5. Validation results are analyzed.
6. Failed outputs trigger correction handling.
7. Metrics are updated.
8. Dashboard displays validated output and system statistics.

---

## Example Schema

### Product Schema

```json
{
  "productName": "string",
  "price": "number",
  "inStock": "boolean"
}
```

---

## Test Prompts

### Valid Prompt

```text
Generate details for an iPhone 15 Pro
```

### Another Prompt

```text
Generate product data for Samsung Galaxy S24
```

### Failure Testing Prompt

```text
Generate product information in plain text only
```

---

## Correction Prompt Design

When validation fails, the system attempts to regenerate a response using stricter formatting instructions.

### Original Prompt

```text
Generate details for an iPhone 15 Pro
```

### Correction Prompt

```text
Return only valid JSON matching the required schema.
Do not include explanations, markdown, comments, or extra text.
```

This approach improves schema compliance and reduces malformed responses.

---

## Schema Injection Strategy Comparison

The following approaches were evaluated for improving schema adherence.

| Strategy | Description | Result |
|----------|-------------|---------|
| Direct Prompt | Prompt only | Lowest reliability |
| Few-Shot Example | Includes example output | Moderate reliability |
| JSON Instruction | Explicit JSON format requirement | Most reliable |

### Conclusion

Explicit JSON instructions produced the highest validation success rate and the lowest number of schema failures.

---

## Failure Logging Approach

The system records:

- Validation failures
- Correction attempts
- Success rate
- Token usage
- API latency

These metrics are exposed through the metrics endpoint and visualized within the dashboard.

---

## Dashboard Metrics

The dashboard displays:

- Total Failures
- Total Corrections
- Success Rate
- Tokens Used
- Latency
- System Health Status

---

## API Endpoints

### Generate Response

```http
POST /generate
```

### Metrics Endpoint

```http
GET /metrics
```

---

## Sample Output

```json
{
  "productName": "iPhone 15 Pro",
  "price": 1200,
  "inStock": true
}
```

---

## System Health Monitoring

The dashboard tracks the status of:

- Validation Engine
- Retry Engine
- Schema Registry
- Metrics Tracking

These components help ensure reliable validation and monitoring of LLM responses.

---

## Reflection

The most difficult schemas to enforce are complex nested JSON structures because language models may:

- Omit required fields
- Produce incorrect data types
- Generate additional unexpected fields
- Return non-JSON text

When the model cannot produce a valid response, the system records the failure, updates dashboard metrics, and attempts correction through a retry-based validation workflow.

---

## Future Enhancements

- Multiple schema support
- Database integration
- User authentication
- Export validation reports
- Advanced analytics dashboard
- Real-time alerting system
- Additional LLM provider support

---

## Author

Pari Agarwal

B.Tech CSE 

Sikkim Manipal Institute of Technology (SMIT)

---

## Repository Structure

```text
llm-validator
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend
│   └── server.js
│
├── package.json
├── package-lock.json
└── README.md
```
