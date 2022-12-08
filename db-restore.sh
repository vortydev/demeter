#!/bin/bash

# Get the ID of the docker container that runs the mysql service and store it into a variable
CONTAINER_ID=$(docker ps | grep mysql | awk '{print $1}')

# Get the user and pwd stored in the .env file
DB_USER=$(cat .env | grep MYSQLDB_USER | cut -d '=' -f2)
DB_PWD=$(cat .env | grep MYSQLDB_ROOT_PASSWORD | cut -d '=' -f2)

# Print a list of the available backups
echo "Below is a list of the latest backups:"
ls -1 backups | grep "demeter_db_" | sort -r | nl | head -5

# Asks the user to choose a file
printf "\nEnter the file you wish to restore from: "
read dumpPath

# Create a "backups" folder if it doesn't exist
if [ ! -d "backups" ]; then
  mkdir backups
fi

# Copy the content of the database called "demeter_db" into a CSV file
docker exec -i $CONTAINER_ID mysql -u $DB_USER -p$DB_PWD demeter_db < ./backups/$dumpPath

exit 0