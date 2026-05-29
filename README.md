# LLM Output Validator Dashboard

## Project Overview

The LLM Output Validator Dashboard is a web-based application designed to validate AI-generated responses against predefined schemas and monitor validation performance through an interactive dashboard. The system helps ensure that Large Language Model (LLM) outputs follow the required structure while tracking important operational metrics.

---

## Features

* Accepts user prompts through an interactive dashboard interface.
* Sends prompts from frontend to backend using REST APIs.
* Generates AI responses based on predefined product schemas.
* Validates AI-generated outputs against schema rules.
* Automatically detects invalid or malformed responses.
* Tracks validation failures and correction attempts.
* Implements retry-based validation workflow.
* Monitors API response latency.
* Tracks token usage for each request.
* Calculates and displays validation success rate.
* Visualizes validation metrics using interactive charts.
* Displays validated responses in JSON format.
* Provides real-time dashboard updates.
* Includes system health monitoring for:

  * Validation Engine
  * Retry Engine
  * Schema Registry
  * Metrics Tracking
* Responsive and modern dashboard UI.

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Data Visualization

* Chart.js

---

## Project Workflow

1. User enters a prompt in the dashboard.
2. Frontend sends the prompt to the backend API.
3. Backend processes the request and generates an AI response.
4. Generated output is validated against the predefined schema.
5. Validation results are analyzed.
6. Failed validations are logged and correction attempts are tracked.
7. Metrics are calculated:

   * Total Failures
   * Total Corrections
   * Success Rate
   * Tokens Used
   * Latency
8. Dashboard charts and KPI cards are updated.
9. Final validated output is displayed in JSON format.

---

## Dashboard Metrics

* Total Failures
* Total Corrections
* Success Rate
* Token Usage
* Response Latency
* System Health Status

---

## API Endpoints

### Generate Response

```http
POST /generate
```

### Fetch Metrics

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

## Future Enhancements

* Support for multiple schemas.
* Database integration for persistent logging.
* User authentication and authorization.
* Advanced analytics dashboard.
* Export reports and validation history.
* Real-time monitoring and alerts.

---

## Author

Pari Agarwal

B.Tech CSE

Sikkim Manipal Institute of Technology (SMIT)
