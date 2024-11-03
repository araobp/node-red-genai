const BASE_URL = "http://127.0.0.1:5050";

const chat = async (context, query, k) => {
    const userMessage = encodeURIComponent(query);
    const response = await fetch(`${BASE_URL}/chat?context=${context}&user_message=${userMessage}&k=${k}`);
    const data = await response.json();
    //console.log(data);
    return data.answer;
}

module.exports = function(RED) {
    function ChatNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            const context = msg.payload.context;
            const query = msg.payload.query;
            const k = msg.payload.k;
            console.log(query);
            const answer = await chat(context, query, k);
            msg.payload = answer;
            node.send(msg);
        });
    }
    RED.nodes.registerType("chat", ChatNode);
}

