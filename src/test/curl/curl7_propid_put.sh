#!/bin/bash
curl --insecure --silent -X 'PUT' \
  'https://localhost:12005/properties/{id}?PropertyID=4' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'api_key: cs4783ftw!' \
  -d '{
  "address": "Texas Ganghouse",
  "city": "San Antonio",
  "state": "TX",
  "zip": "78222"
}' > ./response.txt

if diff "./response.txt" "./res/curl7_propid_put.txt" > /dev/null; then
  echo "CURL7: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL7: RESPONSE INVALID"
  exit 1
fi