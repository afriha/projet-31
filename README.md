### Projet-31
A MERN App that allows users to create an account, verify it with their emails and use a small calculator app. The projet also contains a Dockerfile and Kubernetes deployement files. The Gitlab-CI pipeline creates a docker image and pushes it to DockerHub. 

## Requirements
- For the MERN APP: mongodb database installed and a sendgrid api_key
- For the build pipeline: DOCKER_USER and DOCKER_PASS variables defined in Gitlab-CI variables. Update IMAGE_TAG with your DockerHub accountid/image
- For the Deployment pipeline: A Kubernetes cluster associated and connected with Gitlab-CI. The cluster must contain the Jaeger operator for the tracing to work.

## Usage
- Run start.sh to start the application on a simple Linux server
- For the CI/CD demo, edit the server.js to serve the client2 folder instead of client and push (with tags) to your repo.
- If needed, the app can be deployed on a Kubernetes cluster by taging the changes and pushing to the master (need manuel confirmation for the deployment) 