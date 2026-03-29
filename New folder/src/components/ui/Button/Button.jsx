import React from "react";
import { cn } from "../../../utils/slugify";

/**
 * Button — base UI atom.
 *
 * @param {'primary'|'outline'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'}                        size
 * @param {boolean}                                loading
 * @param {boolean}                                fullWidth
 */
const variantMap = {
  primary: "bg-red-600 text-white hover:bg-red-700 border-transparent",
  outline: "border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600",
  ghost:   "text-gray-700 hover:bg-gray-100 border-transparent",
  danger:  "bg-red-700 text-white hover:bg-red-800 border-transparent",
};

const sizeMap = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};

const Button = React.forwardRef(({
  children,
  variant   = "primary",
  size      = "md",
  loading   = false,
  fullWidth = false,
  className = "",
  disabled,
  ...rest
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      "inline-flex items-center justify-center gap-2 font-semibold rounded",
      "active:scale-95 transition-all duration-150 whitespace-nowrap",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
      variantMap[variant] ?? variantMap.primary,
      sizeMap[size]       ?? sizeMap.md,
      fullWidth && "w-full",
      className
    )}
    {...rest}
  >
    {loading && (
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    )}
    {children}
  </button>
));

Button.displayName = "Button";
export default Button;
