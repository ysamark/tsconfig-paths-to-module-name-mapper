"use strict";

var _vitest = require("vitest");
var _moduleAliasesToModuleNameMapper = require("./moduleAliasesToModuleNameMapper");
(0, _vitest.describe)("Test module aliases to module name mapper util", () => {
  (0, _vitest.it)("should pare module aliases given the right arguments", () => {
    const paths = {
      "@models": "./app/models",
      "@services": "./app/services",
      "@controllers": "./app/controllers"
    };
    const moduleNameMapper = (0, _moduleAliasesToModuleNameMapper.moduleAliasesToModuleNameMapper)(paths, {
      prefix: "./src"
    });
    (0, _vitest.expect)(moduleNameMapper).toMatchObject({
      "^@models/(.*)$": "./src/app/models/$1",
      "^@services/(.*)$": "./src/app/services/$1",
      "^@controllers/(.*)$": "./src/app/controllers/$1"
    });
  });
});