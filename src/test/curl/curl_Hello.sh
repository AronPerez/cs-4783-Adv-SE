#!/bin/bash
curl --silent --insecure -X GET https://localhost:12005/hello > ./response.txt

if diff "./response.txt" "./res/curl_Hello_response.txt" > /dev/null; then
  echo "CURL1: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL1: RESPONSE INVALID"
  exit 1
fi