import { config } from "./../config.js";
import { vueTasks } from "./vue/vueTasks.js";
import { reactTasks } from "./react/reactTasks.js";
import Listr from "listr";
import threads from "./threads.js";
import chalk from "chalk";
import fsi from "fs-extra";
import boxen from "boxen";
import enquirer from "enquirer";
const { prompt } = enquirer;

const init = () => {
  if (config.get("framework") == "vue") {
    console.log(
      chalk.green(
        `\n\tInstalling Vuejs Project for ${config.get("appName")}\t\n`
      )
    );
    return vueTasks(threads);
  }

  if (config.get("framework") == "react") {
    console.log(
      chalk.blue(
        `\n\tInstalling Reactjs Project for ${config.get("appName")}\t\n`
      )
    );
    return reactTasks(threads);
  }
};

export const installation = async (name, options, framework) => {
  config.set("appName", name);
  config.set("framework", framework);
  let response = "";
  if (
    fsi.existsSync(
      `${process.cwd()}/${config.get("framework")}-${config.get("appName")}`
    )
  ) {
    response = await prompt({
      type: "input",
      name: "override",
      message: "Project with same name exist, do you want to continue? (y/n)",
    });
    if (response.override == "n") process.exit(0);
    else {
      fsi.rmSync(
        `${process.cwd()}/${config.get("framework")}-${config.get("appName")}`,
        { recursive: true, force: true }
      );
      return new Listr(init());
    }
  } else return new Listr(init());
};
