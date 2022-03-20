import { config } from "./../config.js";

export const getHeadlessCmps = (components) => {
  const list = [];
  if (components.length > 0) {
    config.get("headlessUi").forEach((el) => {
      if (components.includes(el.name)) list.push(el.components);
    });
  }
  return list;
};
