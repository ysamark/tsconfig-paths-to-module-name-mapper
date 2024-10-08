import fs from "fs";
import path from "path";
import {
  AliasPathSourceHandler,
  AliasPathSourceHandlerContext,
  ModuleAliases,
  ModuleAliasesToModuleNameMapperOptions,
  ModulePaths,
} from "./types";

export const pathsToModuleAliases = (
  paths: ModulePaths,
  options: ModuleAliasesToModuleNameMapperOptions
) => {
  const moduleAliases: ModuleAliases = {};
  const pathPrefix =
    typeof options.prefix === "string"
      ? options.prefix.replace(/(\/)+$/, "")
      : "";
  const acceptMultiple =
    typeof options.multiple !== "boolean" ? true : options.multiple;

  Object.keys(paths).forEach((aliasPath) => {
    const aliasPathKey = aliasPath.replace(
      /(\/)?\*$/,
      ""
    ) as keyof ModuleAliases;

    if (
      paths[aliasPath] instanceof Array &&
      (paths[aliasPath].length === 1 || !acceptMultiple)
    ) {
      const aliasPathValue = paths[aliasPath][0]?.replace(/(\/)?\*$/, "");

      const aliasPathSource = [pathPrefix, aliasPathValue || ""].join("/");

      moduleAliases[aliasPathKey] = aliasPathSource;

      return;
    }

    const aliasPathValues =
      typeof paths[aliasPath] === "string"
        ? [paths[aliasPath]]
        : paths[aliasPath];

    const aliasPathSourceHandler: AliasPathSourceHandler = function ({
      rootDir,
    }) {
      this.rootDir = rootDir;

      function aliasPathSourceHandler(
        this: AliasPathSourceHandlerContext,
        _fromPath: string,
        request: string
      ) {
        const { prefix, source } = this.path;

        const slashRe = /[/\\\\]+/;

        const requestSliceOffset = this.path.key.split(slashRe).length;

        const fileNameSuffixes = [
          ".json",
          "/index.json",
          ".js",
          "/index.js",
          "",
        ];

        for (let i = 0; i < source.length; i++) {
          const sourcePath = [
            this.rootDir,
            prefix,
            source[i].replace(/\/\*$/, ""),
          ].join("/");

          const requestFilePathSlices = request.split(slashRe);

          const requestFilePath = requestFilePathSlices
            .slice(requestSliceOffset, requestFilePathSlices.length)
            .join("/");

          for (let n = fileNameSuffixes.length - 1; n >= 0; n--) {
            const requestFilePathAlternate = path.resolve(
              sourcePath,
              [requestFilePath, fileNameSuffixes[n]].join("")
            );

            if (fs.existsSync(requestFilePathAlternate)) {
              return sourcePath;
            }
          }
        }

        return request;
      }

      return aliasPathSourceHandler.bind(this);
    };

    if (aliasPathValues instanceof Array) {
      // Object.assign(aliasPathSourceHandler, {
      //   path: {
      //     prefix: pathPrefix,
      //     source: aliasPathValues,
      //     key: aliasPathKey,
      //   },
      // });

      moduleAliases[aliasPathKey] = aliasPathSourceHandler.bind({
        rootDir: "",
        path: {
          prefix: pathPrefix,
          source: aliasPathValues,
          key: String(aliasPathKey),
        },
      });
    }
  });

  return moduleAliases;
};
