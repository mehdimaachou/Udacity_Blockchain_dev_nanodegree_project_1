"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */
var SHA256 = require('crypto-js/sha256');

var BlockClass = require('./block.js');

var bitcoinMessage = require('bitcoinjs-message');

var hex2ascii = require('hex2ascii');

var Blockchain =
/*#__PURE__*/
function () {
  /**
   * Constructor of the class, you will need to setup your chain array and the height
   * of your chain (the length of your chain array).
   * Also everytime you create a Blockchain class you will need to initialized the chain creating
   * the Genesis Block.
   * The methods in this class will always return a Promise to allow client applications or
   * other backends to call asynchronous functions.
   */
  function Blockchain() {
    _classCallCheck(this, Blockchain);

    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }
  /**
   * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
   * You should use the `addBlock(block)` to create the Genesis Block
   * Passing as a data `{data: 'Genesis Block'}`
   */


  _createClass(Blockchain, [{
    key: "initializeChain",
    value: function initializeChain() {
      var block;
      return regeneratorRuntime.async(function initializeChain$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.height === -1)) {
                _context.next = 4;
                break;
              }

              block = new BlockClass.Block({
                data: 'Genesis Block'
              });
              _context.next = 4;
              return regeneratorRuntime.awrap(this._addBlock(block));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */

  }, {
    key: "getChainHeight",
    value: function getChainHeight() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        resolve(_this.height);
      });
    }
    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */

  }, {
    key: "_addBlock",
    value: function _addBlock(block) {
      var self = this;
      return new Promise(function _callee(resolve, reject) {
        var hash;
        return regeneratorRuntime.async(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                block.height = self.height + 1;
                block.previousBlockHash = self.height !== -1 ? self.height : null;
                block.time = new Date().getTime().toString().slice(0, -3);
                hash = SHA256(block.height + block.body + block.time + block.previousBlockHash).toString();

                if (hash !== "") {
                  block.hash = hash;
                  self.chain.push(block);
                  self.height++;
                  resolve(block);
                } else {
                  reject("Error. Unable to hash the block. Block NOT saved.");
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        });
      }); // {
      //     this.hash = null;                                           // Hash of the block
      //     this.height = 0;                                            // Block Height (consecutive number of each block)
      //     this.body = "{data: 'Genesis Block'}"
      //     this.time = 0;                                              // Timestamp for the Block creation
      //     this.previousBlockHash = null;                              // Reference to the previous Block Hash
      // }
    }
    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */

  }, {
    key: "requestMessageOwnershipVerification",
    value: function requestMessageOwnershipVerification(address) {
      return new Promise(function (resolve) {
        var message = "".concat(address, ":").concat(new Date().getTime().toString().slice(0, -3), ":starRegistry");
        resolve(message);
      });
    }
    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */

  }, {
    key: "submitStar",
    value: function submitStar(address, message, signature, star) {
      var self = this;
      return new Promise(function _callee2(resolve, reject) {
        var time, currentTime, block;
        return regeneratorRuntime.async(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                time = parseInt(message.split(':')[1]);
                currentTime = parseInt(new Date().getTime().toString().slice(0, -3));

                if (!(time >= currentTime - 300000 && time <= currentTime)) {
                  _context3.next = 11;
                  break;
                }

                // FIXME: enabling verification: error using adresses from my bitcoin core
                // if (bitcoinMessage.verify(message, address, signature)) {
                block = new BlockClass.Block(star);
                block.address = address;
                _context3.next = 7;
                return regeneratorRuntime.awrap(self._addBlock(block));

              case 7:
                block = _context3.sent;
                resolve(block); // } else {
                //     reject("bitcoin Message verification failed")
                // }

                _context3.next = 12;
                break;

              case 11:
                reject("time elapsed not respected");

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        });
      });
    }
    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */

  }, {
    key: "getBlockByHash",
    value: function getBlockByHash(hash) {
      var self = this;
      return new Promise(function (resolve, reject) {
        var block = self.chain.filter(function (block) {
          return block.hash === hash;
        })[0];

        if (block) {
          resolve(block);
        } else {
          reject(null);
        }
      });
    }
    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */

  }, {
    key: "getBlockByHeight",
    value: function getBlockByHeight(height) {
      var self = this;
      return new Promise(function (resolve, reject) {
        var block = self.chain.filter(function (p) {
          return p.height === height;
        })[0];

        if (block) {
          resolve(block);
        } else {
          resolve(null);
        }
      });
    }
    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */

  }, {
    key: "getStarsByWalletAddress",
    value: function getStarsByWalletAddress(address) {
      var self = this;
      var stars = [];
      return new Promise(function (resolve, reject) {
        self.chain.filter(function (block) {
          return block.address === address;
        }).forEach(function (obj) {
          return stars.push({
            owner: address,
            star: JSON.parse(hex2ascii(obj.body))
          });
        });
        resolve(stars);
      });
    }
    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */

  }, {
    key: "validateChain",
    value: function validateChain() {
      var self = this;
      var errorLog = [];
      return new Promise(function _callee3(resolve, reject) {
        return regeneratorRuntime.async(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                errorLog = self.chain.map(function (block) {
                  return {
                    hash: block.hash,
                    isValid: SHA256(block.height + block.body + block.time + block.previousBlockHash).toString() === block.hash // FIXME: didnt find a way to cast the obj to Block Class.

                  };
                }).filter(function (b) {
                  return !b.isValid;
                });
                resolve(errorLog);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        });
      });
    }
  }]);

  return Blockchain;
}();

module.exports.Blockchain = Blockchain;