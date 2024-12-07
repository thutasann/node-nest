#!/bin/bash

REQUEST=40
URL="http://localhost:3000"

echo "Sending $REQUEST requests to $URL"

for ((i=1; i<=REQUEST; i++)); do
  echo "Request #$i"
  curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "$URL"
done

echo "Completed $REQUEST requests."