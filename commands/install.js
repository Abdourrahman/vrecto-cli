import chalk from "chalk";
import { installation } from "./tasks.js";

const install = async (name, options) => {
  for (let i = 0; i < options.framework.length; i++) {
    const task = await installation(name, options, options.framework[i]);
    await task.run().catch((err) => {
      // console.error(err);
      console.error(chalk.red.bold("error occured please try again"));
    });

    // the end of line
    if (i + 1 == options.framework.length) {
      console.log("");
    }
  }
};

export const createApp = async (name, options) => await install(name, options);
