#!/bin/bash

# Backup the database
bash backup-db.sh

# Stop the application
docker-compose down

# Builds and starts the application
docker-compose build
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d

exit 0