import { ModuleAliases, ModuleAliasesToModuleNameMapperOptions } from "./types";

export const moduleAliasesToModuleNameMapper = (
  moduleAliases: ModuleAliases,
  options: ModuleAliasesToModuleNameMapperOptions
) => {
  const moduleNameMap = {};

  const pathPrefix =
    typeof options.prefix === "string"
      ? options.prefix.replace(/(\/)+$/, "")
      : "";

  if (typeof moduleAliases === "object") {
    Object.keys(moduleAliases).forEach((moduleAlias) => {
      const moduleAliasKeyRe = `^${moduleAlias}/(.*)$`;
      const moduleAliasValue = `${pathPrefix}/${moduleAliases[
        moduleAlias
      ].replace(/^(\.\/)+/, "")}/$1`;

      moduleNameMap[moduleAliasKeyRe] = moduleAliasValue;
    });
  }

  return moduleNameMap;
};
