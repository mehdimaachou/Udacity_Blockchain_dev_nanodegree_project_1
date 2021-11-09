"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */
var express = require("express");

var morgan = require("morgan");

var bodyParser = require("body-parser");

var debug = require('debug')('http'),
    http = require('http'),
    name = 'My App';
/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */


var BlockChain = require('./src/blockchain.js');

var ApplicationServer =
/*#__PURE__*/
function () {
  function ApplicationServer() {
    _classCallCheck(this, ApplicationServer);

    //Express application object
    this.app = express(); //Blockchain class object

    this.blockchain = new BlockChain.Blockchain(); //Method that initialized the express framework.

    this.initExpress(); //Method that initialized middleware modules

    this.initExpressMiddleWare(); //Method that initialized the controllers where you defined the endpoints

    this.initControllers(); //Method that run the express application.

    this.start();
  }

  _createClass(ApplicationServer, [{
    key: "initExpress",
    value: function initExpress() {
      this.app.set("port", 8000);
    }
  }, {
    key: "initExpressMiddleWare",
    value: function initExpressMiddleWare() {
      this.app.use(morgan("dev"));
      this.app.use(bodyParser.urlencoded({
        extended: true
      }));
      this.app.use(bodyParser.json());
    }
  }, {
    key: "initControllers",
    value: function initControllers() {
      require("./BlockchainController.js")(this.app, this.blockchain);
    }
  }, {
    key: "start",
    value: function start() {
      var self = this;
      this.app.listen(this.app.get("port"), function () {
        debug("Server Listening for port: ".concat(self.app.get("port"))); // Run app with command: DEBUG=* node app.js
      });
    }
  }]);

  return ApplicationServer;
}();

new ApplicationServer();