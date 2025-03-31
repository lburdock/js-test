import React from "react";
import { renderToString } from "react-dom/server";

export const TID = "tid";

export const formatComponentTests = componentArray => {
  return componentArray.map(item => {
    if (React.isValidElement(item)) {
      return { component: item, info: renderToString(item) };
    }

    const { component } = item;
    return { component, info: renderToString(component), ...item };
  });
};
