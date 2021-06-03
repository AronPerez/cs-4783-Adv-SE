#!/bin/bash
curl --insecure --silent -X 'POST' \
  'https://localhost:12005/properties' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "something",
  "city": "sanAba",
  "state": "Tx",
  "zip": "787878"
}' > ./response.txt

if diff "./response.txt" "./res/curl4_prop_post_fail.txt" > /dev/null; then
  echo "CURL4: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL4: RESPONSE INVALID"
  exit 1
fi