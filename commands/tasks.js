import { config } from "./../config.js";
import Listr from "listr";
import threads from "./registreTasks.js";
import chalk from "chalk";
/*
- seperate the tasks on own  file with only an export method 
- 
*/
const init = () => {
  let tasks = [];
  // React
  if (config.get("framework") == "vue") {
    console.log(
      chalk.green(
        `\n\tInstalling Vuejs Project for ${config.get("appName")}\t\n`
      )
    );
    return (tasks = vueTasks);
  }

  if (config.get("framework") == "react") {
    console.log(
      chalk.blue(
        `\n\tInstalling Reactjs Project for ${config.get("appName")}\t\n`
      )
    );
    return (tasks = reactTasks);
  }
};

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

let reactTasks = [
  {
    title: threads.get("vite").name,
    task: threads.get("vite").task,
  },
  {
    title: threads.get("tailwind").name,
    task: threads.get("tailwind").task,
  },
  {
    title: threads.get("assets").name,
    task: threads.get("assets").task,
  },
];

let vueTasks = [
  {
    title: threads.get("vite").name,
    task: threads.get("vite").task,
  },
  {
    title: threads.get("tailwind").name,
    task: threads.get("tailwind").task,
  },
  {
    title: threads.get("assets").name,
    task: threads.get("assets").task,
  },
  {
    title: threads.get("pinia").name,
    task: threads.get("pinia").task,
  },
];

export const installation = (name, options, framework) => {
  config.set("appName", name);
  config.set("framework", framework);

  return new Listr(init());
};
