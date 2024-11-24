const BASE_URL = "http://127.0.0.1:5050";

const capture = async (skip_frames, rect_image) => {
    const response = await fetch(`${BASE_URL}/camera?skip_frames=${skip_frames}&rect_image=${rect_image}`);
    const data = await response.json();
    return data.b64image;
}

module.exports = function(RED) {
    function CameraNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            this.status({fill: "blue", shape: "dot", text: "capturing..."});
            const b64image = await capture(config.skip_frames, config.rect_image);
            this.status({});
            msg.payload = b64image;
            if ('chat_params' in msg) {
                msg.chat_params.b64image = b64image;
            } else {
                msg.chat_params = {b64image: b64image};
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("camera", CameraNode);
}

