#! /usr/bin/env node
import { program } from "commander";
import { createComponent } from "./commands/create.js";
import { installpackage } from "./commands/install.js";

program
  .command("create:cmp <cmp>")
  .description("Create a vue components")
  .option("-c ,--composition", "the component will  Composition API")
  .option("-o ,--option", "flag for the options API")
  .option("-h ,--headless [co...]", "flag to import headless ui components")
  .action(createComponent);

program
  .command("install:package <name>")
  .description("Install a package to the project")
  .option("-v ,--version", "install package with specefic version")
  .action(installpackage);

program.parse();
