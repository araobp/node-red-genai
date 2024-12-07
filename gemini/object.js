module.exports = function(RED) {
    function ObjectNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            const jsonData = msg.payload.replace('```json', '').replace('```', '');
            msg.payload = JSON.parse(jsonData);
            node.send(msg);
        });
    }
    RED.nodes.registerType("object", ObjectNode);
}
