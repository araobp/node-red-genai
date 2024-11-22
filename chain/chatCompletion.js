const openai = require('openai');

const MODEL = "gpt-4o-mini";

const client = new openai.OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

const chat = async (query="", json_output=false, b64image=null) => {
    
    const content = b64image === null ? query : [
        {
            type: 'text',
            text: query
        },
        {
            type: 'image_url',
            url: b64image 
        },
    ]
    
    const argv = {
        messages: [{ role: 'user', content: content }],
        model: MODEL
    }
    console.log(json_output);
    if (json_output) {
        argv['response_format'] = { type: 'json_object' }
    }
    console.log(argv)
    
    const response = await client.chat.completions.create(argv);
    return response.choices[0]?.message?.content;
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
    const answer = chat('Am I smart?', false, null);
    answer.then( value => {
        console.log(value);
    });
}
