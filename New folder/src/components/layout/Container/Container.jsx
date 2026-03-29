import React from "react";
import { cn } from "../../../utils/slugify";

/**
 * Container — responsive max-width wrapper.
 *
 * @param {'default'|'narrow'|'wide'|'full'} size
 */
const sizeMap = {
  narrow:  "max-w-3xl",
  default: "max-w-[1320px]",
  wide:    "max-w-screen-2xl",
  full:    "max-w-none",
};

const Container = ({ children, size = "default", className = "", as: Tag = "div" }) => (
  <Tag className={cn("mx-auto w-full px-4", sizeMap[size], className)}>
    {children}
  </Tag>
);

export default Container;
