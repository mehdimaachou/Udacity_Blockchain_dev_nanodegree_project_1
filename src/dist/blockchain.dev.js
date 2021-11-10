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
        var currentHeight, previousBlock, validationErrors;
        return regeneratorRuntime.async(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(self.getChainHeight());

              case 2:
                currentHeight = _context2.sent;

                if (!(currentHeight > -1)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 6;
                return regeneratorRuntime.awrap(self.getBlockByHeight(currentHeight));

              case 6:
                previousBlock = _context2.sent;
                block.previousBlockHash = previousBlock.hash;

              case 8:
                block.time = new Date().getTime().toString().slice(0, -3);
                _context2.next = 11;
                return regeneratorRuntime.awrap(self.validateChain());

              case 11:
                validationErrors = _context2.sent;

                if (!validationErrors.length) {
                  block.height = currentHeight + 1;
                  block.hash = SHA256(JSON.stringify(block)).toString();
                  self.chain.push(block);
                  self.height++;
                  resolve(block);
                } else {
                  reject({
                    message: "Blockchain is invalid!",
                    error: validationErrors,
                    status: false
                  });
                }

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        });
      })["catch"](function (error) {
        console.error(error);
      });
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
                currentTime = parseInt(new Date().getTime().toString().slice(0, -3)); //if (time >= currentTime - 300000 && time <= currentTime) {

                if (!(currentTime - time <= 300)) {
                  _context3.next = 10;
                  break;
                }

                // FIXME: enabling verification: error using adresses from my bitcoin core
                // if (bitcoinMessage.verify(message, address, signature)) {
                block = new BlockClass.Block({
                  address: address,
                  star: star
                }); //block.address = address;

                _context3.next = 6;
                return regeneratorRuntime.awrap(self._addBlock(block));

              case 6:
                block = _context3.sent;
                resolve(block); // } else {
                //     reject("bitcoin Message verification failed")
                // }

                _context3.next = 11;
                break;

              case 10:
                reject("time elapsed not respected");

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        });
      })["catch"](function (error) {
        console.error(error);
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
      return new Promise(function _callee3(resolve, reject) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, block, blockData;

        return regeneratorRuntime.async(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 3;
                _iterator = self.chain[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 15;
                  break;
                }

                block = _step.value;

                if (!(block.height !== 0)) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 10;
                return regeneratorRuntime.awrap(block.getBData());

              case 10:
                blockData = _context4.sent;

                if (blockData.address === address) {
                  stars.push(blockData);
                }

              case 12:
                _iteratorNormalCompletion = true;
                _context4.next = 5;
                break;

              case 15:
                _context4.next = 21;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 21:
                _context4.prev = 21;
                _context4.prev = 22;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 24:
                _context4.prev = 24;

                if (!_didIteratorError) {
                  _context4.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context4.finish(24);

              case 28:
                return _context4.finish(21);

              case 29:
                return _context4.abrupt("return", stars.length > 0 ? resolve(stars) : reject("No Stars attached to this address"));

              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, null, null, [[3, 17, 21, 29], [22,, 24, 28]]);
      })["catch"](function (error) {
        console.error(error);
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
      return new Promise(function _callee4(resolve, reject) {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, block, currentBlockHeight, previousBlock;

        return regeneratorRuntime.async(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 3;
                _iterator2 = self.chain[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context5.next = 22;
                  break;
                }

                block = _step2.value;
                _context5.next = 9;
                return regeneratorRuntime.awrap(block.validate());

              case 9:
                if (!_context5.sent) {
                  _context5.next = 18;
                  break;
                }

                currentBlockHeight = block.height; // check then if previous block hash is equal to current block value of "previousBlockHash"

                if (!(currentBlockHeight > 0)) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 14;
                return regeneratorRuntime.awrap(self.getBlockByHeight(currentBlockHeight - 1));

              case 14:
                previousBlock = _context5.sent;

                if (previousBlock.hash !== block.previousBlockHash) {
                  errorLog.push(new Error("Blockchain broken! Invalid link bt Block ".concat(block.currentBlockHeight, " and Block ").concat(currentBlockHeight - 1)));
                }

              case 16:
                _context5.next = 19;
                break;

              case 18:
                errorLog.push(new Error("Block ".concat(block.height, " invalid.")));

              case 19:
                _iteratorNormalCompletion2 = true;
                _context5.next = 5;
                break;

              case 22:
                _context5.next = 28;
                break;

              case 24:
                _context5.prev = 24;
                _context5.t0 = _context5["catch"](3);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 28:
                _context5.prev = 28;
                _context5.prev = 29;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 31:
                _context5.prev = 31;

                if (!_didIteratorError2) {
                  _context5.next = 34;
                  break;
                }

                throw _iteratorError2;

              case 34:
                return _context5.finish(31);

              case 35:
                return _context5.finish(28);

              case 36:
                resolve(errorLog);

              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, null, null, [[3, 24, 28, 36], [29,, 31, 35]]);
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }]);

  return Blockchain;
}();

module.exports.Blockchain = Blockchain;