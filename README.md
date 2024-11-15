# Node-RED for Generative AI

Note: this is my hobby project.

<img src="./docs/camera_test.jpg" width=600>

## Background and Motivation

I need a LLM-chain framework for marketing data analysis. Node-RED is perfect for realizing the framework.

## Requirements

Everything in this project runs on Raspberry Pi:

- Raspberry Pi
- [Compact RAG (API Server)](https://github.com/araobp/compact-rag) and OpenAI API Key
- Mosquitto Broker (MQTT Broker)

2024/11/16 Note: I am going to remove the dependency on Compact RAG.

## Set up

### Compact RAG (API Server)

2024/11/16 Note: I am going to remove the dependency on Compact RAG.

This project uses my original API server: https://github.com/araobp/compact-rag

The reason why this project uses the API server made with Python:
- I want to use opencv, pandas and networkx.
- Usually, we need not only Node-RED (event-driven) but also web UI (client-server) and other kinds of UIs (e.g, 3D game engine such as Unity).

### Running Node-RED on Raspberry Pi

https://nodered.org/docs/getting-started/raspberrypi

### MQTT Broker setup

https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/

## Original Node-RED package "cx"

This project develops original Node-RED nodes as "cx package" to interwork with the Compact RAG for AI Agents.

=> [cx package](./cx)

### Installing the package

It is useful to define a bash alias for installing the package in Node-RED, like this:
```
alias rl='cd ~/.node-red;npm install ~/node-red-ai-agents/cx;node-red-stop;node-red-start'
```

## Flows

Node-RED flows => [flows](./flows)

- [SAMPLE_FLOWS.md](./docs/SAMPLE_FLOWS.md)
- [ROCK_PAPER_SCISSORS.md](./docs/ROCK_PAPER_SCISSORS.md)

## MQTT client app for smart phones

I find MyMQTT very useful for this project:
- https://play.google.com/store/apps/details?id=at.tripwire.mqtt.client&hl=en
- https://apps.apple.com/us/app/mymqtt/id1634425878

## References

- https://nodered.org/docs/creating-nodes/
 
