#!/bin/bash
curl --insecure --silent -X 'DELETE' \
'https://localhost:12005/properties/{id}?PropertyID=0' \
-H  'accept: application/json' \
-H  'api_key: cs4783ftw!' \
 > ./response.txt

if diff "./response.txt" "./res/curl9_propid_del_fail.txt" > /dev/null; then
  echo "CURL9: RESPONSE VERIFIED [PASSED]"
  exit 0
else
  echo "CURL9: RESPONSE INVALID"
  exit 1
fi