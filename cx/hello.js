const BASE_URL = "http://127.0.0.1:5050";

const hello = async () => {
    const response = await fetch(`${BASE_URL}/hello`);
    const data = await response.json();
    return data.message;
}

module.exports = function(RED) {
    function HelloNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            this.status({fill: "green", shape: "dot", text: "in progress..."});
            const message = await hello();
            this.status({})
            msg.payload = message;
            node.send(msg);
        });
    }
    RED.nodes.registerType("hello", HelloNode);
}
