const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

(async function main() {
  try {
    const {
      SLACK_BOT_TOKEN
    } = process.env;

    if (!SLACK_BOT_TOKEN) {
      throw new Error('Missing SLACK_BOT_TOKEN environment var');
    }

    const transforms = {
      boolean: [
        'as_user',
        'link_names	',
        'mrkdwn',
        'reply_broadcast',
        'unfurl_links',
        'unfurl_media',
      ],
      number: ['thread_ts'],
      object: ['attachments', 'blocks']
    };
    
    const channel = core.getInput('channel');
    const text = core.getInput('text');
    const as_user = core.getInput('as_user');
    const attachments = core.getInput('attachments');
    const blocks = core.getInput('blocks');
    const icon_emoji = core.getInput('icon_emoji');
    const icon_url = core.getInput('icon_url');
    const link_names = core.getInput('link_names');
    const mrkdwn = core.getInput('mrkdwn');
    const parse = core.getInput('parse');
    const reply_broadcast = core.getInput('reply_broadcast');
    const thread_ts = core.getInput('thread_ts');
    const unfurl_links = core.getInput('unfurl_links');
    const unfurl_media = core.getInput('unfurl_media');
    const username = core.getInput('username');
    
    let body = {
      channel,
      text,
      as_user,
      attachments,
      blocks,
      icon_emoji,
      icon_url,
      link_names,
      mrkdwn,
      parse,
      reply_broadcast,
      thread_ts,
      unfurl_links,
      unfurl_media,
      username,
    };
    
    for (const [k, v] of Object.entries(body)) {
      if (!v) {
        delete body[k];
      } else if (transforms.boolean.includes(k)) {
        body[k] = v === 'true' ? true : false;
      } else if (transforms.number.includes(k)) {
        body[k] = parseFloat(v);
      } else if (transforms.object.includes(k)) {
        body[k] = JSON.parse(v);
      }
    }

  console.log('* Sending:', JSON.stringify(body, null, 2));

    const res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    
    if (res.ok) {
      console.log(json);
    } else {
      console.error(json);
      throw new Error(`Request failed with status ${res.status}`)
    }
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }  
})()
