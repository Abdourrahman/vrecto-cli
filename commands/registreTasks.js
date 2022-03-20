import { config } from "./../config.js";
import execa, { shellSync } from "execa";
import { install } from "pkg-install";
import fsi from "fs-extra";
import chalk from "chalk";
import capitalize from "capitalize";

const threads = new Map();
console.log(
  chalk.black.bgGreenBright.bold(`Installing ${config.get("appName")}`)
);

/**
Vite Task
*/

threads.set("vite", {
  name: `Installing vite for ${config.get("framework")} template`,
  task() {
    // if the framework is React
    const { stdoutVue } = shellSync(
      `npm create vite@latest ${config.get("framework")}-${config.get(
        "appName"
      )} -- --template ${config.get("framework")}`
    );
  },
});

/**
Vue Tasks
*/

threads.set("tailwind", {
  name: "Installing Tailwindcss",
  task: () => {
    // const { stdoutVue } = shellSync(
    //   `npm install tailwindcss postcss autoprefixer`,
    //   {
    //     cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
    //       "appName"
    //     )}`,
    //   }
    // );
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
          cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
            "appName"
          )}`,
          dev: true,
          prefer: "npm",
        }
      );
    })();
  },
});

threads.set("assets", {
  name: "Preparing assets files",
  task: async () => {
    const { stdout } = await execa("npx", ["tailwindcss", "init", "-p"], {
      cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}`,
    });
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/tailwind.config.js`,
      tailwindconfig,
      () => {}
    );
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/index.css`,
      tailcssconfig,
      () => {}
    );
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/main.js`,
      tailJsconfig,
      () => {}
    );
  },
});

threads.set("pinia", {
  name: "Installing Pinia",
  task: () => {
    (async () => {
      const { stdout } = await install(
        {
          pinia: "",
          "node-env-run": "~1",
          "pkg-install": undefined,
        },
        {
          cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
            "appName"
          )}`,
          dev: true,
          prefer: "npm",
        }
      );
    })();
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/main.js`,
      piniaConfig,
      () => {}
    );

    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/store/use${capitalize(config.get("appName"))}.js`,
      piniaStoreConfig,
      () => {}
    );
    // setTimeout(() => {
    //   console.log("");
    // }, 2000);
  },
});

/**
 * React Tasks
 */

/**
 * Templates
 */

let piniaConfig = `import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";

createApp(App).use(createPinia).mount("#app");`;

let piniaStoreConfig = `import { defineStore } from 'pinia'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const use${capitalize(
  config.get("appName")
)}Store = defineStore('main', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {},
})
`;

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

export default threads;
