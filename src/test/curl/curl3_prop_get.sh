#!/bin/bash
curl --insecure -s -o /dev/null -w "%{http_code}" https://localhost:12005/properties > ./response.txt

if diff "./response.txt" "./res/curl3_prop_get.txt" > /dev/null; then
  echo "CURL3: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL3: RESPONSE INVALID"
  exit 1
fi