import { ModuleAliases, ModuleAliasesToModuleNameMapperOptions } from "./types";

export const moduleAliasesToModuleNameMapper = (
  moduleAliases: ModuleAliases,
  options: ModuleAliasesToModuleNameMapperOptions = {}
) => {
  const moduleNameMap = {} as ModuleAliases;

  const pathPrefix =
    typeof options.prefix === "string"
      ? options.prefix.replace(/(\/)+$/, "")
      : "";

  if (typeof moduleAliases === "object") {
    Object.keys(moduleAliases).forEach((moduleAlias) => {
      const moduleAliasKeyRe = `^${moduleAlias}/(.*)$`;
      const moduleAliasKey = moduleAliases[moduleAlias];

      if (typeof moduleAliasKey === "string") {
        const moduleAliasValue = `${pathPrefix}/${moduleAliasKey.replace(
          /^(\.\/)+/,
          ""
        )}/$1`;

        moduleNameMap[moduleAliasKeyRe] = moduleAliasValue;
      }
    });
  }

  return moduleNameMap;
};
