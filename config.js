import conf from "conf";
export const config = new conf();

config.set("appName", "");

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

let headless = [
  {
    name: "menu",
    components: ["Menu", "MenuButton", "MenuItems", "MenuItem"],
  },
  {
    name: "listbox",
    components: ["Listbox", "ListboxButton", "ListboxOptions", "ListboxOption"],
  },
  {
    name: "combobox",
    components: [
      "Combobox",
      "ComboboxInput",
      "ComboboxOptions",
      "ComboboxOption",
    ],
  },
  {
    name: "switch",
    components: ["Switch", "SwitchGroup", "SwitchLabel"],
  },
  {
    name: "disclosure",
    components: ["Disclosure", "DisclosureButton", "DisclosurePanel"],
  },
  {
    name: "dialog",
    components: ["Dialog", "DialogOverlay", "DialogTitle", "DialogDescription"],
  },
  {
    name: "popover",
    components: ["Popover", "PopoverButton", "PopoverPanel"],
  },
  {
    name: "radio",
    components: ["RadioGroup", "RadioGroupLabel", "RadioGroupOption"],
  },
  {
    name: "transition",
    components: ["TransitionRoot", "TransitionChild"],
  },
  {
    name: "tabs",
    components: ["TabGroup", "TabList", "Tab", "TabPanels", "TabPanel"],
  },
];
config.set("headlessUi", headless);
config.set("tailwindConfigModule", tailwindconfig);
config.set("tailwindConfigCss", tailcssconfig);
config.set("tailwindConfigJs", tailJsconfig);
