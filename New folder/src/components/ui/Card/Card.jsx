import React from "react";
import { cn } from "../../../utils/slugify";

/**
 * Card — generic surface container.
 */
const Card = ({ children, className = "", padding = true, ...rest }) => (
  <div
    className={cn(
      "bg-white rounded-lg border border-gray-100 shadow-sm",
      padding && "p-4 sm:p-6",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={cn("pb-4 mb-4 border-b border-gray-100", className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={cn("font-display font-bold text-gray-900 text-lg", className)}>
    {children}
  </h3>
);

export default Card;
