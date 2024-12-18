const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env['GEMINI_API_KEY'];
const genAI = new GoogleGenerativeAI(API_KEY);

const chat = async (model_name, prompt="", b64image=null) => {
    var result;
    const model = genAI.getGenerativeModel({ model: model_name });

    if (b64image) {
        const data = b64image.split(',')[1].trim();
        const mimeType = b64image.split(';')[0].split(':')[1];


        result = await model.generateContent([
            {
                inlineData: {
                    data: data,
                    mimeType: mimeType
                }
            },
            prompt
        ]);
    } else {
        result = await model.generateContent(prompt);
    }
    return result.response.text();
}

module.exports = function(RED) {
    function GeminiNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async msg => {
            const prompt = msg.payload;
            const b64image = msg.b64image ?? null;
            this.status({fill: "green", shape: "dot", text: "in progress..."});
            console.log(config.model);
            const answer = await chat(config.model, prompt, b64image);
            this.status({});
            msg.payload = answer;
            node.send(msg);
        });
    }
    RED.nodes.registerType("gemini", GeminiNode);
}
