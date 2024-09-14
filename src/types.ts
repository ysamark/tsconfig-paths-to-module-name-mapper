export type ModuleAliasesToModuleNameMapperOptions = Partial<{
  prefix: string;
  multiple: boolean;
}>;

export type ModuleAliases = {
  [key: string]:
    | string
    | AliasPathSourceHandler
    | Array<string | AliasPathSourceHandler>;
};

export type ModulePaths = {
  [key: string]: Array<string>;
};

export type AliasPathSourceHandler = (
  this: AliasPathSourceHandlerContext,
  props: { rootDir: string; path: string }
) => unknown;

export type AliasPathSourceHandlerContext = {
  rootDir: string;
  path: {
    prefix: string;
    source: string | Array<string>;
    key: string;
  };
};
