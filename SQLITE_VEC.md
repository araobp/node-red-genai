# sqlite-vec for node.js

## sqlite-vec installation

### Building sqlite-vec for Raspberry Pi

```
$ git clone https://github.com/asg017/sqlite-vec
$ cd sqlite-vec
$ sudo apt-get install libsqlite3-dev
$ make loadable 
```

Find "vec0.so" in ./dist directory.

### Installation

```
$ cd
$ npm install sqlite-vec
$ npm install better-sqlite3
$ cd node_modules
$ mkdir sqlite-vec-linux-arm
$ cp <vec0.so dist folder>/vec0.so sqlite-vec-linux-arm
```
