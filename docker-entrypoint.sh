#!/bin/sh

set -e

echo "Waiting for Postgres to be ready..."
until pg_isready -h db -p 5432 -U root; do
  sleep 1
done

echo "Running migrations..."
npm run db:migrate

echo "Starting the app..."
exec "$@"
