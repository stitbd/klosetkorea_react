import React from "react";
import { cn } from "../../../utils/slugify";

/**
 * Input — base text input atom.
 */
const Input = React.forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightElement,
  className = "",
  wrapperClassName = "",
  ...rest
}, ref) => (
  <div className={cn("flex flex-col gap-1", wrapperClassName)}>
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <div className="relative flex items-center">
      {leftIcon && (
        <span className="absolute left-3 text-gray-400 pointer-events-none">{leftIcon}</span>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full border rounded-lg text-sm text-gray-800 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          "transition py-2.5",
          leftIcon    ? "pl-9 pr-4"  : "px-4",
          rightElement ? "pr-11"     : "",
          error ? "border-red-400" : "border-gray-300",
          className
        )}
        {...rest}
      />
      {rightElement && (
        <span className="absolute right-0 top-0 h-full">{rightElement}</span>
      )}
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
    {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
));

Input.displayName = "Input";
export default Input;
