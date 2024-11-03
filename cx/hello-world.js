const BASE_URL = "http://127.0.0.1:5050";

const hello = async () => {
    const response = await fetch(`${BASE_URL}/hello`);
    const data = await response.json();
    return data.message;
}

module.exports = function(RED) {
    function HelloWorldNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            const message = await hello();
            msg.payload = message;
            node.send(msg);
        });
    }
    RED.nodes.registerType("hello-world",HelloWorldNode);
}
