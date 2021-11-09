"use strict";

var bitcoinMessage = require('bitcoinjs-message');

var BlockClass = require('./src/block.js');

var myObj = {
  "hash": "7e98128a476adf24d362ceb5232e991acad789d94f3ab91bdbc9e52160cbcbec",
  "height": 1,
  "body": "7b22646563223a22706f736974696f6e222c227261223a2274696d65222c2273746f7279223a22746573742031227d",
  "time": "1636313000",
  "previousBlockHash": 0,
  "address": "bc1q68mtn0zl3g26mug4e4rvp87f5936fwu26a660j"
};
console.log(Object.assign(new BlockClass.Block({}), myObj).validate());