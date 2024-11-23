const MODEL = "gpt-4o-mini";
const API_KEY = process.env['OPENAI_API_KEY'];

const HEADERS = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
}

const URL = "https://api.openai.com/v1/chat/completions";

const chat = async (query="", json_output=false, b64image=null) => {
    
    const content = (b64image === null) ? query : [
        {
            type: 'text',
            text: query
        },
        {
            type: 'image_url',
            image_url: {
                url: b64image
            }
        },
    ]
    
    const body = {
        messages: [{ role: 'user', content: content }],
        model: MODEL
    }

    const request = {
        headers: HEADERS,
        body: JSON.stringify(body),
        method: 'POST',        
    }
    
    if (json_output) {
        request['response_format'] = {type: 'json_object'};
    }
        
    const response = await fetch(URL, request);
    const r = await response.json();

    return r.choices[0]?.message?.content;
}

module.exports = function(RED) {
    function ChatCompletionsNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            const query = msg.payload;
            const json_output = config.json_output;
            const b64image = msg.b64image ?? null;
            this.status({fill: "green", shape: "dot", text: "in progress..."});
            const answer = await chat(query, json_output, b64image);
            this.status({});
            msg.payload = answer;
            node.send(msg);
        });
    }
    RED.nodes.registerType("chat-completions", ChatCompletionsNode);
}

if (require.main === module) {
    const fs = require('node:fs');
    fs.readFile('/tmp/testimg.png', 'ascii', (err, b64image) => {
    if (err) {
        console.error(err);
        return;
    }
    const answer = chat('Describe', false, `data:image/png;base64,${b64image}`);
        answer.then( v => { console.log(v);});
    });
}
