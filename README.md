# Node-RED for Generative AI

Note: this is my hobby project.

<img src="./docs/chain_tests.jpg" width=700>

## Background and Motivation

I need a node-based low-code development platform supporting LLM-chains with visual programming.

## Requirements

- [OpenAI API Key](https://platform.openai.com/docs)
- [Gemini API](https://ai.google.dev/gemini-api/docs)
- [sqlite-vec](https://github.com/asg017/sqlite-vec) (>= v0.1.6)

## Set up

I use Raspberry Pi 3 (Linux) for this project, but all the programs in this project should run on other operating systems.

### Running Node-RED on Raspberry Pi

https://nodered.org/docs/getting-started/raspberrypi

### sqlite-vec on Raspberry Pi with Node.js

=> [SQLITE_VEC.md](./SQLITE_VEC.md)

## My Original Node-RED package "chain"

=> [chain package](./chain)

### Installing the package

It is useful to define a bash alias for installing the package in Node-RED, like this:
```
alias rlc='cd ~/.node-red;npm install ~/node-red-genai/chain;node-red-stop;node-red-start'
```
### RAG indexing

=> [indexing](./ref)

## Flows

Node-RED flows => [flows](./flows)

## References

- https://nodered.org/docs/creating-nodes/
- https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/
 
