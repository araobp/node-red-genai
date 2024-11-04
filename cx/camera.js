const BASE_URL = "http://127.0.0.1:5050";

const capture = async () => {
    const response = await fetch(`${BASE_URL}/camera`);
    const data = await response.json();
    return data.b64image;
}

module.exports = function(RED) {
    function CameraNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            this.status({fill: "blue", shape: "dot", text: "capturing..."});
            const b64image = await capture();
            this.status({});
            msg.payload = b64image;
            node.send(msg);
        });
    }
    RED.nodes.registerType("camera", CameraNode);
}

