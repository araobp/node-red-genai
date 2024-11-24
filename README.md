# Node-RED for Generative AI

Note: this is my hobby project.

<img src="./docs/chain_tests.jpg" width=700>

## Background and Motivation

I need a LLM-chain framework for marketing data analysis. Node-RED is perfect for realizing the framework.

## Requirements

- Raspberry Pi
- MQTT Broker (optional)

## Set up

### Running Node-RED on Raspberry Pi

https://nodered.org/docs/getting-started/raspberrypi

### MQTT Broker

https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/

## My Original Node-RED package "chain"

=> [chain package](./chain)

### Installing the package

It is useful to define a bash alias for installing the package in Node-RED, like this:
```
alias rlc='cd ~/.node-red;npm install ~/node-red-genai/chain;node-red-stop;node-red-start'
```

## Flows

Node-RED flows => [flows](./flows)

## References

- https://nodered.org/docs/creating-nodes/
 
