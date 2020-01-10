# Slack Post Message

## Post a message to a Slack channel

### First Steps

1. [Create a new Slack App](https://api.slack.com/apps?new_app=1)
1. Go to "Basic Information" > "Display Information" > "App icon & Preview" and add avatar for you App. This will be shown in Slack when you receive messages
1. Go to "Bot User" > "Add" and add a bot user to your Slack App
1. Go to "Install App" > "Install App to Workspace" to install your Slack App into your Slack workspace
1. Go to "Features > OAuth & Permissions" and copy the _Bot User OAuth Access Token_
1. Create a secret in your repository and store the the _Bot User OAuth Access Token_
1. To invite the bot to a channel write the `@bot-name`

### Options

All available arguments are explained on the [Slack chat.postMessage documentation](https://api.slack.com/methods/chat.postMessage)

### Example

```yaml
name: Notify PR

on: [pull_request]

env:
  SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}

jobs:
  notify-pr-changes:
    runs-on: ubuntu-latest
    steps:
      - name: Notify PR changes
        uses: actions/action-slack-post-message@v3
        with:
          channel: '#general'
          text: "GITHUB::${{ github.event_name }} -- https://github.com/example/repo#${{ github.head_ref }}"
```
