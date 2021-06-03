#!/bin/bash
curl --insecure -s -o /dev/null -w "%{http_code}" https://localhost:12005/properties > ./response.txt

if ! diff "./response.txt" "./res/curl5_prop_get_fail.txt" > /dev/null; then
  echo "CURL5: RESPONSE INVALID"
  exit 1
else
echo "CURL5: RESPONSE VERIFIED [PASSED]"
  exit 0
fi