import { describe, expect, it } from "vitest";

import { pathsToModuleNameMapper } from "./pathsToModuleNameMapper";
import { ModulePaths } from "./types";

describe("Test paths to modules aliases util", () => {
  it("should convert a paths config to modules aliases data object", () => {
    const paths: ModulePaths = {
      "@models/*": ["app/models/*"],
      "@services/*": ["app/services/*"],
      "@controllers/*": ["app/controllers/*"],
    };

    const moduleAliases = pathsToModuleNameMapper(paths, {
      prefix: "./src",
    });

    expect(moduleAliases).toMatchObject({
      "^@models/(.*)$": "./src/app/models/$1",
      "^@services/(.*)$": "./src/app/services/$1",
      "^@controllers/(.*)$": "./src/app/controllers/$1",
    });
  });
});
