#!/bin/bash

# Get the ID of the docker container that runs the mysql service and store it into a variable
CONTAINER_ID=$(docker ps | grep demeter-demeter-api | awk '{print $1}')

# echo "List of files in the directory with the name 'demeter_db_' followed by a date:"
# ls -l | grep "demeter_db_[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]" | awk '{print $NF}' | tac

if [ ! -d "backups" ]; then
  mkdir backups
fi

echo "Below is a list of the latest backups:"
ls -1 backups | grep "demeter_db_" | sort -r | nl

printf "\nEnter the file you wish to restore from: "
read dumpPath

# TODO
# docker exec -it $CONTAINER_ID node -e 'this.readCSVFile("backups/'$dumpPath'")'

exit 0