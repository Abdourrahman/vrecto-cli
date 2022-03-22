/**
 *
 * @param {*} threads
 * @returns Array of Tasks for ReactJs create application
 */
export const reactTasks = (threads) => {
  return [
    /**
    Installing Vite for ReactJs
    */
    {
      title: threads.get("vite").name,
      task: threads.get("vite").task,
    },
    /**
    Installing Tailwindcss for ReactJs
    */
    {
      title: threads.get("tailwind").name,
      task: threads.get("tailwind").task,
    },
    /**
    Installing Headless ui for ReactJs
    */
    {
      title: threads.get("headlessUiReact").name,
      task: threads.get("headlessUiReact").task,
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
