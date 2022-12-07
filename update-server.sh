#!/bin/bash
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
exit 0