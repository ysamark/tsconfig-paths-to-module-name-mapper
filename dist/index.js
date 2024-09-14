"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _moduleAliasesToModuleNameMapper = require("./moduleAliasesToModuleNameMapper");
Object.keys(_moduleAliasesToModuleNameMapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _moduleAliasesToModuleNameMapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _moduleAliasesToModuleNameMapper[key];
    }
  });
});
var _pathsToModuleAliases = require("./pathsToModuleAliases");
Object.keys(_pathsToModuleAliases).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pathsToModuleAliases[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pathsToModuleAliases[key];
    }
  });
});
var _pathsToModuleNameMapper = require("./pathsToModuleNameMapper");
Object.keys(_pathsToModuleNameMapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pathsToModuleNameMapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pathsToModuleNameMapper[key];
    }
  });
});