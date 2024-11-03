const BASE_URL = "http://127.0.0.1:5050";

const chat = async (context, query, k=3, b64image=null) => {
    const userMessage = encodeURIComponent(query);
    const url = `${BASE_URL}/chat?context=${context}&user_message=${userMessage}&k=${k}`;
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
            var b64image = null;
            if ('b64image' in msg.payload) {
                b64image = msg.payload.b64image;
            }
            //console.log(query);
            const answer = await chat(context, query, k, b64image);
            msg.payload = answer;
            node.send(msg);
        });
    }
    RED.nodes.registerType("chat", ChatNode);
}

