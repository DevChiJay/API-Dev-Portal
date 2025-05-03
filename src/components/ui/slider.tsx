"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/src/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: "default" | "modern"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const isModern = variant === "modern"

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track 
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-full",
          isModern ? "bg-primary/20" : "bg-secondary"
        )}
      >
        <SliderPrimitive.Range 
          className={cn(
            "absolute h-full",
            isModern 
              ? "bg-gradient-to-r from-primary to-primary/80" 
              : "bg-primary"
          )} 
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb 
        className={cn(
          "block h-5 w-5 rounded-full border-2 border-primary bg-background transition-colors",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          isModern && [
            "shadow-sm hover:shadow-md active:scale-110",
            "after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-full",
            "after:bg-primary/10 after:opacity-0 after:transition-transform after:duration-300",
            "after:hover:scale-150 after:hover:opacity-100"
          ]
        )} 
      />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
