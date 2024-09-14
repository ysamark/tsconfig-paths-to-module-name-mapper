"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathsToModuleNameMapper = void 0;
const pathsToModuleNameMapper = (paths, options) => {
  const moduleAliases = {};
  const pathPrefix = typeof options.prefix === typeof "str" ? options.prefix.replace(/(\/)+$/, "") : "";
  const acceptMultiple = typeof options.multiple !== typeof true ? true : options.multiple;
  const parsePath = (pathPrefix, path) => {
    const pathValue = path === null || path === void 0 ? void 0 : path.replace(/\/\*$/, "");
    const absolutePathValue = [pathPrefix, pathValue || ""].join("/");
    return `${absolutePathValue}/$1`;
  };
  Object.keys(paths).forEach(aliasPath => {
    const aliasPathKey = `^${aliasPath.replace(/\/\*$/, "")}/(.*)$`;
    if (paths[aliasPath] instanceof Array && (paths[aliasPath].length === 1 || !acceptMultiple)) {
      const aliasPathSource = parsePath(pathPrefix, paths[aliasPath][0]);
      moduleAliases[aliasPathKey] = aliasPathSource;
      return;
    }
    const aliasPathValues = typeof paths[aliasPath] === "string" ? [paths[aliasPath]] : paths[aliasPath];
    if (aliasPathValues instanceof Array) {
      moduleAliases[aliasPathKey] = aliasPathValues.map(value => parsePath(pathPrefix, value));
    }
  });
  return moduleAliases;
};
exports.pathsToModuleNameMapper = pathsToModuleNameMapper;