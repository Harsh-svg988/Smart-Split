#!/bin/bash

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "MongoDB is not running. Starting MongoDB..."
    mongod --dbpath ~/data/db &
    sleep 5  # Wait for MongoDB to start
fi

# Start backend services
cd backend
npm run dev &

# Start frontend
cd ../frontend
npm run dev 