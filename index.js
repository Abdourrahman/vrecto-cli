#! /usr/bin/env node
import { program } from "commander";
import { createComponent } from "./commands/create.js";
import { createApp } from "./commands/install.js";

/**
Make Command
*/
program
  .command("make:app <name>")
  .description("Create new application")
  .option("-f ,--framework <frs...>", "install package with specefic framework")
  .action(createApp);

program
  .command("make:cmp <cmp>")
  .description("Create a vue components")
  .option("-c ,--composition", "the component will  Composition API")
  .option("-o ,--option", "flag for the options API")
  .option("-h ,--headless [co...]", "flag to import headless ui components")
  .action(createComponent);

// program
//   .command("make:store <store>")
//   .description("Create a vue components")
//   .option("-c ,--composition", "the component will  Composition API")
//   .action(createComponent);

program.parse();
