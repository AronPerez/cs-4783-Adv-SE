#!/bin/bash
curl --insecure --silent -X 'POST' \
  'https://localhost:12005/properties' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'api_key: cs4783ftw!' \
  -d '{
  "address": "501 Test Ave",
  "city": "San Antonio",
  "state": "TX",
  "zip": "78222"
}' > ./response.txt

sed -i 's/\,"id":"[0-9]*"//g' response.txt

if diff "./response.txt" "./res/curl2_prop_post.txt" > /dev/null; then
  echo "CURL2: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL2: RESPONSE INVALID"
  exit 1
fi