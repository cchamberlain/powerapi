/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _appMainRoutes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../app/mainRoutes\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _appMainRoutes2 = _interopRequireDefault(_appMainRoutes);

	var _appMainStores = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../app/mainStores\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _appMainStores2 = _interopRequireDefault(_appMainStores);

	var _renderApplication = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./renderApplication\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _renderApplication2 = _interopRequireDefault(_renderApplication);

	(0, _renderApplication2["default"])(_appMainRoutes2["default"], _appMainStores2["default"], {
	  timeout: 600
	});

/***/ }
/******/ ]);