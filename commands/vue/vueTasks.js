/**
 *
 * @param {*} threads
 * @returns Array of Tasks for Vuejs create application
 */
export const vueTasks = (threads) => {
  return [
    /**
    Installing Vite for VueJs
    **/
    {
      title: threads.get("vite").name,
      task: threads.get("vite").task,
    },
    /**
    Installing Tailwindcss for VueJs
    */
    {
      title: threads.get("tailwind").name,
      task: threads.get("tailwind").task,
    },
    /**
    Installing Headless ui for VueJs
    */
    {
      title: threads.get("headlessUiVue").name,
      task: threads.get("headlessUiVue").task,
    },
    /**
    Installing Pinia for VueJs
    */
    {
      title: threads.get("pinia").name,
      task: threads.get("pinia").task,
    },
    /**
    Configuring Assets for ReactJs
    */
    {
      title: threads.get("assets").name,
      task: threads.get("assets").task,
    },
  ];
};
