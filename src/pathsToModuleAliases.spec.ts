import { describe, expect, it } from "vitest";

import { pathsToModuleAliases } from "./pathsToModuleAliases";
import { ModulePaths } from "./types";

describe("Test paths to modules aliases util", () => {
  it("should convert a paths config to modules aliases data object", () => {
    const paths: ModulePaths = {
      "@models/*": ["app/models/*"],
      "@services/*": ["app/services/*"],
      "@controllers/*": ["app/controllers/*"],
    };

    const moduleAliases = pathsToModuleAliases(paths, {
      prefix: "./src",
    });

    expect(moduleAliases).toMatchObject({
      "@models": "./src/app/models",
      "@services": "./src/app/services",
      "@controllers": "./src/app/controllers",
    });
  });
});
