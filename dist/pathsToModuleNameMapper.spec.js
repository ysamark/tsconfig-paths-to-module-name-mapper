"use strict";

var _vitest = require("vitest");
var _pathsToModuleNameMapper = require("./pathsToModuleNameMapper");
(0, _vitest.describe)("Test paths to modules aliases util", () => {
  (0, _vitest.it)("should convert a paths config to modules aliases data object", () => {
    const paths = {
      "@models/*": ["app/models/*"],
      "@services/*": ["app/services/*"],
      "@controllers/*": ["app/controllers/*"]
    };
    const moduleAliases = (0, _pathsToModuleNameMapper.pathsToModuleNameMapper)(paths, {
      prefix: "./src"
    });
    (0, _vitest.expect)(moduleAliases).toMatchObject({
      "^@models/(.*)$": "./src/app/models/$1",
      "^@services/(.*)$": "./src/app/services/$1",
      "^@controllers/(.*)$": "./src/app/controllers/$1"
    });
  });
});