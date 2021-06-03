#!/bin/bash
curl --insecure --silent -X 'PUT' \
  'https://localhost:12005/properties/{id}?PropertyID=4' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "Texas Ganghouse"
}' > ./response.txt

if diff "./response.txt" "./res/curl8_propid_put_fail.txt" > /dev/null; then
  echo "CURL8: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL8: RESPONSE INVALID"
  exit 1
fi