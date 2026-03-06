import type { ButtonProps } from "./button.type";
import clsx from "clsx";

const BASE_CLASS =
  "px-4 py-2 rounded focus:outline-none transition-colors duration-300";

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
};

export function Button({
  variant = "primary",
  disabled = false,
  type = "button",
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(BASE_CLASS, VARIANT_CLASSES[variant])}
    >
      {children}
    </button>
  );
}
