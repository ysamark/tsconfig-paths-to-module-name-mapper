"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathsToModuleAliases = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pathsToModuleAliases = (paths, options) => {
  const moduleAliases = {};
  const pathPrefix = typeof options.prefix === "string" ? options.prefix.replace(/(\/)+$/, "") : "";
  const acceptMultiple = typeof options.multiple !== "boolean" ? true : options.multiple;
  Object.keys(paths).forEach(aliasPath => {
    const aliasPathKey = aliasPath.replace(/(\/)?\*$/, "");
    if (paths[aliasPath] instanceof Array && (paths[aliasPath].length === 1 || !acceptMultiple)) {
      var _paths$aliasPath$;
      const aliasPathValue = (_paths$aliasPath$ = paths[aliasPath][0]) === null || _paths$aliasPath$ === void 0 ? void 0 : _paths$aliasPath$.replace(/(\/)?\*$/, "");
      const aliasPathSource = [pathPrefix, aliasPathValue || ""].join("/");
      moduleAliases[aliasPathKey] = aliasPathSource;
      return;
    }
    const aliasPathValues = typeof paths[aliasPath] === "string" ? [paths[aliasPath]] : paths[aliasPath];
    const aliasPathSourceHandler = function aliasPathSourceHandler({
      rootDir
    }) {
      this.rootDir = rootDir;
      function aliasPathSourceHandler(_fromPath, request) {
        const _this$path = this.path,
          prefix = _this$path.prefix,
          source = _this$path.source;
        const slashRe = /[/\\\\]+/;
        const requestSliceOffset = this.path.key.split(slashRe).length;
        const fileNameSuffixes = [".json", "/index.json", ".js", "/index.js", ""];
        for (let i = 0; i < source.length; i++) {
          const sourcePath = [this.rootDir, prefix, source[i].replace(/\/\*$/, "")].join("/");
          const requestFilePathSlices = request.split(slashRe);
          const requestFilePath = requestFilePathSlices.slice(requestSliceOffset, requestFilePathSlices.length).join("/");
          for (let n = fileNameSuffixes.length - 1; n >= 0; n--) {
            const requestFilePathAlternate = _path.default.resolve(sourcePath, [requestFilePath, fileNameSuffixes[n]].join(""));
            if (_fs.default.existsSync(requestFilePathAlternate)) {
              return sourcePath;
            }
          }
        }
        return request;
      }
      return aliasPathSourceHandler.bind(this);
    };
    if (aliasPathValues instanceof Array) {
      aliasPathSourceHandler.path = {
        prefix: pathPrefix,
        source: aliasPathValues,
        key: aliasPathKey
      };
      moduleAliases[aliasPathKey] = aliasPathSourceHandler.bind(aliasPathSourceHandler);
    }
  });
  return moduleAliases;
};
exports.pathsToModuleAliases = pathsToModuleAliases;