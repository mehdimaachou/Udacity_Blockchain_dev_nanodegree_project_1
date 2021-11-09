"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */
var SHA256 = require('crypto-js/sha256');

var hex2ascii = require('hex2ascii');

var Block =
/*#__PURE__*/
function () {
  // Constructor - argument data will be the object containing the transaction data
  function Block(data) {
    _classCallCheck(this, Block);

    this.hash = null; // Hash of the block

    this.height = 0; // Block Height (consecutive number of each block)

    this.body = Buffer.from(JSON.stringify(data)).toString('hex'); // Will contain the transactions stored in the block, by default it will encode the data

    this.time = 0; // Timestamp for the Block creation

    this.previousBlockHash = null; // Reference to the previous Block Hash
  }
  /**
   *  validate() method will validate if the block has been tampered or not.
   *  Been tampered means that someone from outside the application tried to change
   *  values in the block data as a consecuence the hash of the block should be different.
   *  Steps:
   *  1. Return a new promise to allow the method be called asynchronous.
   *  2. Save the in auxiliary variable the current hash of the block (`this` represent the block object)
   *  3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
   *  4. Compare if the auxiliary hash value is different from the calculated one.
   *  5. Resolve true or false depending if it is valid or not.
   *  Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
   */


  _createClass(Block, [{
    key: "validate",
    value: function validate() {
      var self = this;
      return new Promise(function (resolve, reject) {
        // Save in auxiliary variable the current block hash
        // Recalculate the hash of the Block
        // Comparing if the hashes changed
        // Returning the Block is not valid
        // Returning the Block is valid
        var currentHash = SHA256(self.height + self.body + self.time + self.previousBlockHash);

        if (currentHash === self.hash) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    }
    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */

  }, {
    key: "getBData",
    value: function getBData() {
      var _this = this;

      // Getting the encoded data saved in the Block
      // Decoding the data to retrieve the JSON representation of the object
      // Parse the data to an object to be retrieve.
      // Resolve with the data if the object isn't the Genesis block
      return new Promise(function (resolve, reject) {
        var body = hex2ascii(_this.body);

        if (body.data !== 'Genesis Block') {
          resolve(JSON.parse(body));
        } else {
          reject('Error: Genesis Block');
        }
      });
    }
  }]);

  return Block;
}();

module.exports.Block = Block; // Exposing the Block class as a module