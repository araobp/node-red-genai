# Node-RED as an AI agent framwork

(Work in progress, this is my hobby project)

<img src="./docs/iot_test.jpg" width=600>

## Background and Motivation

I am an engineer for my company's showroom. I need an AI agent framework that also supports IoT.

## Requirements

Everything in this project runs on Raspberry Pi:

- Raspberry Pi
- [Compact RAG](https://github.com/araobp/compact-rag) and OpenAI API Key
- Mosquitto Broker (MQTT Broker)

## Set up

### API Server

This project uses my original API server: https://github.com/araobp/compact-rag

### Running Node-RED on Raspberry Pi

https://nodered.org/docs/getting-started/raspberrypi

### MQTT Broker setup

https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/

## Original Node-RED package "cx"

This project develops original Node-RED nodes to interwork with the Compact RAG for AI Agents.

=> [cx package](./cx) (Work in progress)

### Installing the package

It is useful to define a bash alias for installing the package in Node-RED, like this:
```
alias rl='cd ~/.node-red;npm install ~/node-red-ai-agents/cx;node-red-stop;node-red-start'
```

## Samples

### Testing IoT flows

<img src="./docs/iot_test.jpg" width=700>

MQTT publisher (This script simulates a proximity sensor emitting an proximity event to the MQTT broker)

```
abc@raspberrypi:~/node-red-ai-agents/bin $ ./image_recognition_start.sh
```

MQTT subscriber (This script simulates a output device such as LCD)

```
abc@raspberrypi:~/node-red-ai-agents/bin $ ./image_recognition_result.sh 
{"keyphrases": ["indoor setting", "ceiling", "curtains", "windows", "wall clock", "square opening", "furniture", "lighting", "daytime", "ambient light"]}
```

### Testing query with RAG

<img src="./docs/rag_test.jpg" width=700>

## References

- https://nodered.org/docs/creating-nodes/
 
