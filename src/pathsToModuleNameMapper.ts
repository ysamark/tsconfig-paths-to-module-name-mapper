import {
  ModuleAliases,
  ModuleAliasesToModuleNameMapperOptions,
  ModulePaths,
} from "./types";

export const pathsToModuleNameMapper = (
  paths: ModulePaths,
  options: ModuleAliasesToModuleNameMapperOptions = {}
) => {
  const moduleAliases = {} as ModuleAliases;
  const pathPrefix =
    typeof options.prefix === "string"
      ? options.prefix.replace(/(\/)+$/, "")
      : "";
  const acceptMultiple =
    typeof options.multiple !== typeof true ? true : options.multiple;

  const parsePath = (pathPrefix: string, path?: string) => {
    const pathValue = path?.replace(/\/\*$/, "");

    const absolutePathValue = [pathPrefix, pathValue || ""].join("/");

    return `${absolutePathValue}/$1`;
  };

  Object.keys(paths).forEach((aliasPath) => {
    const aliasPathKey = `^${aliasPath.replace(
      /\/\*$/,
      ""
    )}/(.*)$` as keyof ModuleAliases;

    if (
      paths[aliasPath] instanceof Array &&
      (paths[aliasPath].length === 1 || !acceptMultiple)
    ) {
      const aliasPathSource = parsePath(pathPrefix, paths[aliasPath][0]);

      moduleAliases[aliasPathKey] = aliasPathSource;

      return;
    }

    const aliasPathValues =
      typeof paths[aliasPath] === "string"
        ? [paths[aliasPath]]
        : paths[aliasPath];

    if (aliasPathValues instanceof Array) {
      moduleAliases[aliasPathKey] = aliasPathValues.map((value) =>
        parsePath(pathPrefix, value)
      );
    }
  });

  return moduleAliases;
};
