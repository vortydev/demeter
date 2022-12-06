#!/bin/bash

# Get the ID of the docker container that runs the mysql service and store it into a variable
CONTAINER_ID=$(docker ps | grep mysql | awk '{print $1}')

# Get the user and pwd stored in the .env file
DB_USER=$(cat .env | grep MYSQLDB_USER | cut -d '=' -f2)
DB_PWD=$(cat .env | grep MYSQLDB_ROOT_PASSWORD | cut -d '=' -f2)

# Copy the content of the database called "demeter_db" into a CSV file
DATE_TIME=$(date +"%Y-%m-%d_%H-%M-%S")

if [ ! -d "backups" ]; then
  mkdir backups
fi

docker exec -it $CONTAINER_ID mysqldump -u $DB_USER -p$DB_PWD demeter_db > ./backups/demeter_db_$DATE_TIME.csv
echo demeter_db_$DATE_TIME.csv was created
exit 0