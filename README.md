# Server Monitoring + Log Analytics Dashboard

A backend and DevOps-focused personal project to build a server monitoring and log analytics platform using modern observability tools.

## Goals
- Build a backend API for service health and monitoring
- Add metrics, logs, and alerts
- Containerize services with Docker
- Integrate Prometheus, Grafana, and Loki
- Practice production-style DevOps workflows with daily PRs

## Progress

### Day 1
- Project initialized
- TypeScript + Express API created
- Base folder structure added
- Initial health endpoint added

### Day 2
- Added request logging middleware
- Moved health routes into a separate route file
- Added readiness endpoint
- Improved API structure for future monitoring features

### Day 3
- Added Dockerfile for the API service
- Added .dockerignore for cleaner builds
- Built the API into a container image
- Ran the API in Docker and tested endpoints

### Day 4
- Added Docker Compose setup at the project root
- Connected the API service to Compose
- Started the project using one command
- Tested API endpoints through Docker Compose

### Day 5
- Added Prometheus metrics to the API
- Exposed a /metrics endpoint
- Added request count and duration tracking
- Added Prometheus service and scrape configuration

### Day 6
- Added Grafana service to Docker Compose
- Provisioned Prometheus as a Grafana datasource automatically
- Verified Grafana can connect to Prometheus
- Prepared the project for dashboards in the next step

### Day 7
- Added a provisioned Grafana dashboard
- Added panels for total requests, request rate, and request duration
- Enabled dashboard auto-loading on startup
- Verified the dashboard reads live Prometheus metrics

### Day 8
- Added structured JSON logging
- Improved request logs with consistent analytics fields
- Added startup, warning, and error log events
- Prepared logs for future Loki integration

## Planned Stack
- Node.js
- TypeScript
- Express
- Docker
- Docker Compose
- Prometheus
- Grafana
- Loki
- OpenTelemetry
