# GitHub Actions CI/CD Pipeline for Node.js

## Project Overview

This project demonstrates a basic CI/CD pipeline for a Node.js application using GitHub Actions and Docker.

Whenever code is pushed to the `main` branch, GitHub Actions automatically:

1. Checks out the source code.
2. Sets up Node.js 24.
3. Runs automated tests.
4. Builds a Docker image.
5. Pushes the Docker image to Docker Hub.

The Docker build and push operations run on GitHub-hosted runners, so a local Docker installation is not required for the pipeline.

## Architecture

```text
Developer
    |
    | git push
    v
GitHub Repository (main)
    |
    v
GitHub Actions Workflow
    |
    +---- Tests
    |       |
    |       +---- npm test
    |
    +---- Build and Push
            |
            +---- Docker login
            |
            +---- Build Docker image
            |
            +---- Push image to Docker Hub
                         |
                         v
              Docker Hub Repository
```

## Technologies Used

- Node.js 24
- JavaScript
- Git and GitHub
- GitHub Actions
- Docker
- Docker Hub
- YAML

## Project Structure

```text
github-actions-nodejs-cicd/
|
|-- .github/
|   |-- workflows/
|       |-- ci-cd.yml
|
|-- app.js
|-- app.test.js
|-- package.json
|-- Dockerfile
|-- README.md
```

## Application Details

The application is a simple HTTP server built using Node.js.

- Listens on port `3000`.
- Returns an HTTP 200 response.
- Displays a welcome message.

## Automated Testing

The project uses Node.js's built-in test runner.

Run the tests locally:

```bash
npm test
```

The automated test verifies:

- HTTP response status code is `200`.
- The application returns the expected response message.

## Docker Configuration

The Dockerfile uses the official Node.js 24 Alpine image as its base image.

The container is configured to:

- Use `/app` as its working directory.
- Copy the application and package configuration.
- Expose port `3000`.
- Start the application using Node.js.

## GitHub Actions Workflow

Workflow file:

`.github/workflows/ci-cd.yml`

Trigger:

- Push to the `main` branch.

Jobs:

**1. tests**

- Checks out the repository.
- Sets up Node.js 24.
- Executes `npm test`.

**2. build-and-push**

- Runs only after the tests succeed.
- Authenticates with Docker Hub using GitHub repository secrets.
- Builds the Docker image.
- Pushes the image to Docker Hub.

## GitHub Secrets

The following repository secrets are configured:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

The Docker Hub access token is stored securely in GitHub Secrets and is not hardcoded in the workflow.

## Docker Hub Image

Repository:

https://hub.docker.com/r/pillaisathya/github-actions-nodejs-cicd

Image:

```text
pillaisathya/github-actions-nodejs-cicd:latest
```

Pull the published image:

```bash
docker pull pillaisathya/github-actions-nodejs-cicd:latest
```

## Project Outcome

Successfully implemented and tested an automated workflow that:

- Runs Node.js automated tests.
- Builds a Docker image.
- Publishes the image to Docker Hub.
- Prevents the image publishing job from running when the test job fails.

## Scope and Limitations

This project implements automated testing, Docker image building, and publishing to Docker Hub.

Deployment to a live application environment is not included in this implementation.
