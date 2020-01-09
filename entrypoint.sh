#!/bin/sh

if [[ -z "$SLACK_BOT_TOKEN" ]]; then
  echo "Set the SLACK_BOT_TOKEN secret."
  exit 1
fi

curl -X POST \
     -H 'Content-type: application/json; charset=utf-8' \
     -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
     -d "$1" \
     https://slack.com/api/chat.postMessage
