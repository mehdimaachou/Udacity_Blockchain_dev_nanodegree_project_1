"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *          BlockchainController
 * 
 * This class expose the endpoints that the client applications will use to interact with the 
 * Blockchain dataset
 */
var BlockchainController =
/*#__PURE__*/
function () {
  //The constructor receive the instance of the express.js app and the Blockchain class
  function BlockchainController(app, blockchainObj) {
    _classCallCheck(this, BlockchainController);

    this.app = app;
    this.blockchain = blockchainObj; // All the endpoints methods needs to be called in the constructor to initialize the route.

    this.getBlockByHeight();
    this.requestOwnership();
    this.submitStar();
    this.getBlockByHash();
    this.getStarsByOwner();
    this.getChainValidation();
  } // Enpoint to Get a Block by Height (GET Endpoint)


  _createClass(BlockchainController, [{
    key: "getBlockByHeight",
    value: function getBlockByHeight() {
      var _this = this;

      this.app.get("/block/height/:height", function _callee(req, res) {
        var height, block;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.params.height) {
                  _context.next = 12;
                  break;
                }

                height = parseInt(req.params.height);
                _context.next = 4;
                return regeneratorRuntime.awrap(_this.blockchain.getBlockByHeight(height));

              case 4:
                block = _context.sent;

                if (!block) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.status(200).json(block));

              case 9:
                return _context.abrupt("return", res.status(404).send("Block Not Found!"));

              case 10:
                _context.next = 13;
                break;

              case 12:
                return _context.abrupt("return", res.status(404).send("Block Not Found! Review the Parameters!"));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    } // Endpoint that allows user to request Ownership of a Wallet address (POST Endpoint)

  }, {
    key: "requestOwnership",
    value: function requestOwnership() {
      var _this2 = this;

      this.app.post("/requestValidation", function _callee2(req, res) {
        var address, message;
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!req.body.address) {
                  _context2.next = 12;
                  break;
                }

                address = req.body.address;
                _context2.next = 4;
                return regeneratorRuntime.awrap(_this2.blockchain.requestMessageOwnershipVerification(address));

              case 4:
                message = _context2.sent;

                if (!message) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json(message));

              case 9:
                return _context2.abrupt("return", res.status(500).send("An error happened!"));

              case 10:
                _context2.next = 13;
                break;

              case 12:
                return _context2.abrupt("return", res.status(500).send("Check the Body Parameter!"));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
    } // Endpoint that allow Submit a Star, yu need first to `requestOwnership` to have the message (POST endpoint)

  }, {
    key: "submitStar",
    value: function submitStar() {
      var _this3 = this;

      this.app.post("/submitstar", function _callee3(req, res) {
        var address, message, signature, star, block;
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(req.body.address && req.body.message && req.body.signature && req.body.star)) {
                  _context3.next = 21;
                  break;
                }

                address = req.body.address;
                message = req.body.message;
                signature = req.body.signature;
                star = req.body.star;
                _context3.prev = 5;
                _context3.next = 8;
                return regeneratorRuntime.awrap(_this3.blockchain.submitStar(address, message, signature, star));

              case 8:
                block = _context3.sent;

                if (!block) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json(block));

              case 13:
                return _context3.abrupt("return", res.status(500).send("An error happened!"));

              case 14:
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](5);
                return _context3.abrupt("return", res.status(500).send(_context3.t0));

              case 19:
                _context3.next = 22;
                break;

              case 21:
                return _context3.abrupt("return", res.status(500).send("Check the Body Parameter!"));

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[5, 16]]);
      });
    } // This endpoint allows you to retrieve the block by hash (GET endpoint)

  }, {
    key: "getBlockByHash",
    value: function getBlockByHash() {
      var _this4 = this;

      this.app.get("/block/hash/:hash", function _callee4(req, res) {
        var hash, block;
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!req.params.hash) {
                  _context4.next = 12;
                  break;
                }

                hash = req.params.hash;
                _context4.next = 4;
                return regeneratorRuntime.awrap(_this4.blockchain.getBlockByHash(hash));

              case 4:
                block = _context4.sent;

                if (!block) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", res.status(200).json(block));

              case 9:
                return _context4.abrupt("return", res.status(404).send("Block Not Found!"));

              case 10:
                _context4.next = 13;
                break;

              case 12:
                return _context4.abrupt("return", res.status(404).send("Block Not Found! Review the Parameters!"));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        });
      });
    } // This endpoint allows you to request the list of Stars registered by an owner

  }, {
    key: "getStarsByOwner",
    value: function getStarsByOwner() {
      var _this5 = this;

      this.app.get("/blocks/:address", function _callee5(req, res) {
        var address, stars;
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!req.params.address) {
                  _context5.next = 18;
                  break;
                }

                address = req.params.address;
                _context5.prev = 2;
                _context5.next = 5;
                return regeneratorRuntime.awrap(_this5.blockchain.getStarsByWalletAddress(address));

              case 5:
                stars = _context5.sent;

                if (!stars) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", res.status(200).json(stars));

              case 10:
                return _context5.abrupt("return", res.status(404).send("Block Not Found!"));

              case 11:
                _context5.next = 16;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", res.status(500).send("An error happened!"));

              case 16:
                _context5.next = 19;
                break;

              case 18:
                return _context5.abrupt("return", res.status(500).send("Block Not Found! Review the Parameters!"));

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, null, null, [[2, 13]]);
      });
    }
  }, {
    key: "getChainValidation",
    value: function getChainValidation() {
      var _this6 = this;

      this.app.get("/validatechain", function _callee6(req, res) {
        var results;
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(_this6.blockchain.validateChain());

              case 2:
                results = _context6.sent;
                res.status(200).json(results);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        });
      });
    }
  }]);

  return BlockchainController;
}();

module.exports = function (app, blockchainObj) {
  return new BlockchainController(app, blockchainObj);
};