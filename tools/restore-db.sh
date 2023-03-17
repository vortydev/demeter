#!/bin/bash

# Get the ID of the docker container that runs the mysql service and store it into a variable
# CONTAINER_ID=$(docker ps | grep mysql | awk '{print $1}')
CONTAINER_ID=$(docker ps -qf "name=mysql")

# Check if the container is running
if [ "$(docker inspect -f '{{.State.Running}}' "$CONTAINER_ID")" != "true" ]; then
  echo "MySQL container is not running. Backup restoration aborted."
  exit 1
fi

# Stop the process if no backups exist
if [ ! -d "backups" ]; then
  echo "No backups detected. Aborting process."
fi

# List all .tar files in the current directory
backups=($(ls ./backups/*.csv))

# Check if there are any .csv files
if [ ${#backups[@]} -eq 0 ]; then
  echo "No .csv files found. Aborting process."
  exit 1
fi

# Get the user and pwd stored in the .env file
DB_USER=$(cat .env | grep MYSQLDB_USER | cut -d '=' -f2)
DB_PWD=$(cat .env | grep MYSQLDB_ROOT_PASSWORD | cut -d '=' -f2)

# Print a list of the available backups
echo "Choose a backup to restore:"

# Sort the backups array by modification time, newest to oldest
sorted_backups=($(ls -t ./backups/*.csv))

# Print the 5 most recent backups
for i in {0..4}; do
  if [[ -n ${sorted_backups[i]} ]]; then  # Check if the element exists
    filename=${sorted_backups[i]##*/}  # Remove everything up to and including the last slash
    echo "$((i + 1)). $filename"
  fi
done

# Asks the user to choose a file
read -p "Enter the number of the backup: " choice

backup_path="${sorted_backups[choice - 1]%.*}.csv"
echo $backup_path

# Copy the content of the database called "demeter_db" into a CSV file
docker exec -i $CONTAINER_ID mysql -u $DB_USER -p$DB_PWD demeter_db < $backup_path

exit 0