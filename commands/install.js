import chalk from "chalk";
import { installation } from "./tasks.js";

const install = async (name, options) => {
  // if options has all
  for (let i = 0; i < options.framework.length; i++) {
    const task = installation(name, options, options.framework[i]);
    // run many tasks

    await task.run().catch((err) => {
      // console.error(err);
      console.error(chalk.red.bold("error occured please try again"));
    });
    if (i + 1 == options.framework.length) {
      console.log("");
    }
  }
};

export const createApp = (name, options) => install(name, options);
