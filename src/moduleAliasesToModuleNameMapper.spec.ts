import { describe, expect, it } from "vitest";

import { moduleAliasesToModuleNameMapper } from "./moduleAliasesToModuleNameMapper";

describe("Test module aliases to module name mapper util", () => {
  it("should pare module aliases given the right arguments", () => {
    const paths = {
      "@models": "./app/models",
      "@services": "./app/services",
      "@controllers": "./app/controllers",
    };

    const moduleNameMapper = moduleAliasesToModuleNameMapper(paths, {
      prefix: "./src",
    });

    expect(moduleNameMapper).toMatchObject({
      "^@models/(.*)$": "./src/app/models/$1",
      "^@services/(.*)$": "./src/app/services/$1",
      "^@controllers/(.*)$": "./src/app/controllers/$1",
    });
  });
});
