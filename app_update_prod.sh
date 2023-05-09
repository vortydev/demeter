#!/bin/bash

# Build and start the application
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
