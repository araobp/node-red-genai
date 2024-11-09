const BASE_URL = "http://127.0.0.1:5050";

const chat = async (context=null, query="", k=3, json_output=false, b64image=null) => {
    const userMessage = encodeURIComponent(query);
    
    var url = `${BASE_URL}/chat?user_message=${userMessage}&k=${k}&json_output=${json_output}`;
    url = (context === null) ? url: url + `&context=${context}`;
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
            const context = (msg.topic === "" || msg.topic === undefined) ? null: msg.topic
            const query = msg.payload;
            const k = msg.chat_params?.k ?? config.k;
            const json_output = config.json_output;
            const b64image = msg.chat_params?.b64image ?? null;
            this.status({fill: "green", shape: "dot", text: "in progress..."});
            const answer = await chat(context, query, k, json_output, b64image);
            this.status({});
            msg.payload = answer;
            node.send(msg);
        });
    }
    RED.nodes.registerType("chat", ChatNode);
}

