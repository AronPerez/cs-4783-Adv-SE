curl --insecure --silent -X \
  -s -o /dev/null -w "%{http_code}" \
  -X 'PUT' \
  'https://localhost:12005/properties/6' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "LIVINLARGE"
}' > ./response.txt

if diff "./response.txt" "./res/curl10_bad_API_key.txt" > /dev/null; then
  echo "CURL10: RESPONSE VERIFIED [PASSED]"
  exit 0
else
echo "CURL10: RESPONSE INVALID"
  exit 1
fi