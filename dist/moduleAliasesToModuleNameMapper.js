"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleAliasesToModuleNameMapper = void 0;
const moduleAliasesToModuleNameMapper = (moduleAliases, options = {}) => {
  const moduleNameMap = {};
  const pathPrefix = typeof options.prefix === "string" ? options.prefix.replace(/(\/)+$/, "") : "";
  if (typeof moduleAliases === "object") {
    Object.keys(moduleAliases).forEach(moduleAlias => {
      const moduleAliasKeyRe = `^${moduleAlias}/(.*)$`;
      const moduleAliasValue = `${pathPrefix}/${moduleAliases[moduleAlias].replace(/^(\.\/)+/, "")}/$1`;
      moduleNameMap[moduleAliasKeyRe] = moduleAliasValue;
    });
  }
  return moduleNameMap;
};
exports.moduleAliasesToModuleNameMapper = moduleAliasesToModuleNameMapper;