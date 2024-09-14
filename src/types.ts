export type ModuleAliasesToModuleNameMapperOptions = Partial<{
  prefix: string;
  multiple: boolean;
}>;

export type ModuleAliases = {
  [key: string]: string;
};

export type ModulePaths = {
  [key: string]: Array<string>;
};
