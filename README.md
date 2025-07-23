# Fastify PoC

This is a proof of concept for a Fastify application.
Fastify is a web framework for Node.js that is designed to be fast and low overhead.

## Run

The application can be run using Docker Compose. Make sure you have Docker and Docker Compose installed.

Then, run the following command:

```bash
docker-compose up -d --build
```

It can also be run in a local Kubernetes cluster using Skaffold.
Make sure you have Skaffold and Helm installed and a local Kubernetes cluster running (Docker Desktop).

Then, run the following command:

```bash
skaffold dev
```