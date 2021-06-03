#!/bin/bash
curl --insecure --silent -X 'GET' \
  'https://localhost:12005/properties/{id}?PropertyID=3' \
  -H  "accept: application/json" \
  > ./response.txt

if diff "./response.txt" "./res/curl6_propid_get.txt" > /dev/null; then
  echo "CURL6: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL6: RESPONSE INVALID"
  exit 1
fi