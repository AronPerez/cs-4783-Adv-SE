#!/bin/bash
# Based on https://stackoverflow.com/questions/16080716/execute-multiple-commands-in-a-bash-script-sequentially-and-fail-if-at-least-one
bash ./curl_Hello.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl2_prop_post.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl3_prop_get.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl4_prop_post_fail.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl5_prop_get_fail.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl6_propid_get.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl7_propid_put.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl8_propid_put_fail.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl9_propid_del_fail.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))
bash ./curl10_bad_API_key.sh || EXIT_STATUS=$(( $EXIT_STATUS + $? ))

#echo $EXIT_STATUS
b=0
if [ "$EXIT_STATUS" > "$b" ]; then
  echo "A TEST FAILED"
  exit 1
fi
  echo "ALL TESTS PASSED"
  exit 0