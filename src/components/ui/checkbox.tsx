"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative size-[18px] shrink-0 rounded-[6px] border-[1.5px]",
        "border-slate-200 dark:border-slate-700",
        "bg-gradient-to-b from-white to-slate-50",
        "dark:from-slate-950 dark:to-slate-900",
        "transition-all duration-200 ease-in-out",
        "hover:border-indigo-200 hover:bg-white",
        "dark:hover:border-indigo-700 dark:hover:from-slate-900 dark:hover:to-slate-800",
        "data-[state=checked]:border-indigo-600 data-[state=checked]:from-indigo-500 data-[state=checked]:to-indigo-600",
        "data-[state=checked]:dark:border-indigo-400 data-[state=checked]:dark:from-indigo-600 data-[state=checked]:dark:to-indigo-700",
        "shadow-sm dark:shadow-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "dark:focus-visible:ring-indigo-400/30 dark:focus-visible:ring-offset-slate-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:hover:border-slate-200 dark:disabled:hover:border-slate-700",
        "aria-invalid:border-rose-500 aria-invalid:hover:border-rose-500",
        "dark:aria-invalid:border-rose-500 dark:aria-invalid:hover:border-rose-500",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          "flex items-center justify-center text-white",
          "transition-all duration-200 ease-in-out",
          "data-[state=checked]:scale-100 data-[state=unchecked]:scale-0",
          "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
        )}
      >
        <CheckIcon className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
