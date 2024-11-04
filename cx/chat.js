const BASE_URL = "http://127.0.0.1:5050";

const chat = async (context, query, k=3, json_output=false, b64image=null) => {
    const userMessage = encodeURIComponent(query);
    const url = `${BASE_URL}/chat?context=${context}&user_message=${userMessage}&k=${k}&json_output=${json_output}`;
    var response;
    if (b64image === null) {
        response = await fetch(url);
    } else {
        response = await fetch(url,
            {
                headers: {"Content-Type": "application/json"},
                method: 'PUT',
                body: JSON.stringify({b64image: b64image})
            }
        );
    }
    const data = await response.json();
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
            const json_output = msg.payload.json_output ?? false;
            const b64image = msg.payload.b64image ?? null;
            this.status({fill: "green", shape: "dot", text: "in progress..."});
            const answer = await chat(context, query, k, json_output, b64image);
            this.status({});
            msg.payload = answer;
            node.send(msg);
        });
    }
    RED.nodes.registerType("chat", ChatNode);
}

