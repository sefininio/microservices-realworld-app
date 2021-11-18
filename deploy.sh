#!/usr/bin/env bash

source .env

echo "Logging into dockerhub..."
echo "$DOCKERHUB_PWD" | docker login  --username sefininio --password-stdin

echo "Deploying feature-article..."
docker tag feature-article sefininio/realworld-app-feature-article:"$DEPLOY_TAG"
docker push sefininio/realworld-app-feature-article:"$DEPLOY_TAG"

echo "Deploying feature-profile..."
docker tag feature-profile sefininio/realworld-app-feature-profile:"$DEPLOY_TAG"
docker push sefininio/realworld-app-feature-profile:"$DEPLOY_TAG"

echo "Deploying feature-tag..."
docker tag feature-tag sefininio/realworld-app-feature-tag:"$DEPLOY_TAG"
docker push sefininio/realworld-app-feature-tag:"$DEPLOY_TAG"

echo "Deploying feature-user..."
docker tag feature-user sefininio/realworld-app-feature-user:"$DEPLOY_TAG"
docker push sefininio/realworld-app-feature-user:"$DEPLOY_TAG"

echo "Deploying gql-gateway..."
docker tag gql-gateway sefininio/realworld-app-gql-gateway:"$DEPLOY_TAG"
docker push sefininio/realworld-app-gql-gateway:"$DEPLOY_TAG"
