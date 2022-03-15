import { config } from "./../config.js";
import chalk from "chalk";
import fsi from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { install } from "pkg-install";
import Listr from "listr";
import execa from "execa";
const installProcess = async (packageName, options) => {
  if (packageName == "tailwind") {
    const tasks = new Listr([
      {
        title: "Installing Tailwindcss",
        task: () =>
          (async () => {
            const { stdout } = await install(
              {
                tailwindcss: "",
                postcss: "",
                autoprefixer: "",
                "node-env-run": "~1",
                "pkg-install": undefined,
              },
              {
                dev: true,
                prefer: "npm",
              }
            );
          })(),
      },
      {
        title: "Preparing assets files",
        task: async () => {
          const { stdout } = await execa("npx", ["tailwindcss", "init", "-p"]);
          fsi.outputFile(
            `${process.cwd()}/tailwind.config.js`,
            tailwindconfig,
            () => {}
          );
          fsi.outputFile(
            `${process.cwd()}/src/index.css`,
            tailcssconfig,
            () => {}
          );
          fsi.outputFile(`${process.cwd()}/src/main.js`, tailJsconfig, () => {
            console.log(
              chalk.green(
                `installing ${packageName} package is finished successfuly`
              )
            );
          });
        },
      },
    ]);
    tasks.run().catch((err) => {
      console.error(err);
    });

    let tailwindconfig = `module.exports = {
        content: [
          "./index.html",
          "./src/**/*.{vue,js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }`;
    let tailcssconfig = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    let tailJsconfig = `import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')`;
  }
};

export const installpackage = (name, options) => installProcess(name, options);
