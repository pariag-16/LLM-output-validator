
// ================================
// CHARTS
// ================================

let metricsChart;
let performanceChart;

// ================================
// LOAD METRICS
// ================================

async function loadMetrics() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/metrics"
            );

        const data =
            await response.json();

        document.getElementById(
            "failures"
        ).innerText =
            data.totalFailures || 0;

        document.getElementById(
            "corrections"
        ).innerText =
            data.totalCorrections || 0;

        document.getElementById(
            "successRate"
        ).innerText =
            data.successRate || "0%";

        createMetricsChart(
            data.totalFailures || 0,
            data.totalCorrections || 0
        );

    } catch (error) {

        console.error(
            "Metrics Error:",
            error
        );

    }
}

// ================================
// GENERATE RESPONSE
// ================================

async function generateResponse() {

    const prompt =
        document.getElementById(
            "promptInput"
        ).value;

    if (!prompt.trim()) {

        alert(
            "Please enter a prompt."
        );

        return;
    }

    const outputBox =
        document.getElementById(
            "outputBox"
        );

    outputBox.innerText =
        "Generating response...";

    try {

        const response =
            await fetch(
                "http://localhost:5000/generate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        schema: "product",
                        prompt
                    })
                }
            );

        const data =
            await response.json();

        document.getElementById(
            "attempts"
        ).innerText =
            data.attempts || "-";

        document.getElementById(
            "responseLatency"
        ).innerText =
            data.latency || "-";

        document.getElementById(
            "responseTokens"
        ).innerText =
            data.tokensUsed || "-";

        document.getElementById(
            "tokensUsed"
        ).innerText =
            data.tokensUsed || 0;

        document.getElementById(
            "latency"
        ).innerText =
            data.latency || "0ms";

        outputBox.innerText =
            JSON.stringify(
                data.validatedData,
                null,
                2
            );

        addLog(
            prompt,
            data.success
                ? "Validation Successful"
                : "Validation Failed",
            data.success
                ? "Success"
                : "Failed"
        );

        loadMetrics();

    } catch (error) {

        outputBox.innerText =
            error.message;

        addLog(
            prompt,
            error.message,
            "Failed"
        );

    }
}

// ================================
// FAILURE LOGS
// ================================

function addLog(
    prompt,
    error,
    status
) {

    const table =
        document.getElementById(
            "logsTable"
        );

    if (
        table.children.length === 1 &&
        table.innerText.includes(
            "No logs yet"
        )
    ) {
        table.innerHTML = "";
    }

    const row =
        document.createElement(
            "tr"
        );

    row.innerHTML = `

        <td>
            ${prompt}
        </td>

        <td>
            ${error}
        </td>

        <td>
            ${status}
        </td>

    `;

    table.prepend(row);
}

// ================================
// DONUT CHART
// ================================

function createMetricsChart(
    failures,
    corrections
) {

    const ctx =
        document.getElementById(
            "metricsChart"
        );

    if (metricsChart) {
        metricsChart.destroy();
    }

    metricsChart =
        new Chart(
            ctx,
            {
                type: "doughnut",

                data: {

                    labels: [
                        "Failures",
                        "Corrections"
                    ],

                    datasets: [
                        {
                            data: [
                                failures,
                                corrections
                            ],

                            backgroundColor: [
                                "#f87171",
                                "#22d3ee"
                            ],

                            borderWidth: 0
                        }
                    ]
                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {
                            labels: {
                                color:
                                    "white"
                            }
                        }
                    }
                }
            }
        );
}

// ================================
// PERFORMANCE CHART
// ================================

function createPerformanceChart() {

    const ctx =
        document.getElementById(
            "performanceChart"
        );

    performanceChart =
        new Chart(
            ctx,
            {
                type: "line",

                data: {

                    labels: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun"
                    ],

                    datasets: [

                        {
                            label:
                                "Latency",

                            data: [
                                280,
                                320,
                                300,
                                350,
                                290,
                                310,
                                270
                            ],

                            borderColor:
                                "#60a5fa",

                            backgroundColor:
                                "rgba(96,165,250,.2)",

                            fill: true
                        },

                        {
                            label:
                                "Throughput",

                            data: [
                                180,
                                200,
                                220,
                                210,
                                260,
                                240,
                                280
                            ],

                            borderColor:
                                "#22d3ee",

                            backgroundColor:
                                "rgba(34,211,238,.2)",

                            fill: true
                        }

                    ]
                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {

                            labels: {
                                color:
                                    "white"
                            }
                        }
                    },

                    scales: {

                        x: {

                            ticks: {
                                color:
                                    "white"
                            }
                        },

                        y: {

                            ticks: {
                                color:
                                    "white"
                            }
                        }
                    }
                }
            }
        );
}

// ================================
// INIT
// ================================

window.onload =
function () {

    loadMetrics();

    createPerformanceChart();

};

