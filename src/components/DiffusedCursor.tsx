"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * @component DiffusedCursor
 * @description Creates a custom cursor that smoothly follows the mouse.
 * This component uses GSAP for fluid animations and linear interpolation (lerping)
 * to create a delayed "follow" effect. The cursor's size can be dynamically
 * changed when hovering over elements with a `data-cursor-hover` attribute,
 * providing a rich, visual feedback for user interactions. It's designed
 * to be performant by using `requestAnimationFrame` for its animation loop.
 */
export default function DiffusedCursor() {
  // Tracks current mouse position.
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  // Tracks smoothed cursor position.
  const delayedMouse = useRef<MousePosition>({ x: 0, y: 0 });
  // Reference to cursor element.
  const circle = useRef<HTMLDivElement>(null);
  // Stores animation frame ID.
  const rafId = useRef<number>(0);
  // Holds current cursor size.
  const size = useRef(20);

  // Smoothly interpolates between values.
  const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;

  // Updates mouse position on move.
  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    // Stores exact mouse coordinates.
    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  // Moves the cursor element.
  const moveCircle = (x: number, y: number) => {
    if (circle.current) {
      // GSAP: Instantly sets position.
      gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
    }
  };

  // Handles cursor growth on hover.
  const handleHoverStart = (newSize: number = 40) => {
    size.current = newSize;
    if (circle.current) {
      // GSAP: Animates cursor size up.
      gsap.to(circle.current, {
        width: newSize,
        height: newSize,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Handles cursor shrink on exit.
  const handleHoverEnd = () => {
    size.current = 20;
    if (circle.current) {
      // GSAP: Animates cursor to default.
      gsap.to(circle.current, {
        width: 20,
        height: 20,
        duration: 0.3,
        ease: "power4.out",
      });
    }
  };

  // Sets up all event listeners.
  const setupEventListeners = () => {
    // Finds all hoverable elements.
    const hoverElements = document.querySelectorAll("[data-cursor-hover]");

    // Attaches mouseenter/mouseleave events.
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        const customSize = element.getAttribute("data-cursor-size");
        handleHoverStart(customSize ? parseInt(customSize) : 40);
      });

      element.addEventListener("mouseleave", handleHoverEnd);
    });
  };

  // Runs the animation loop.
  const animate = () => {
    const { x, y } = delayedMouse.current;
    // Calculates smoothed cursor position.
    delayedMouse.current = {
      // prettier-ignore
      x: lerp(x, mouse.current.x, 0.09),
      y: lerp(y, mouse.current.y, 0.09),
    };
    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    // Continues animation on next frame.
    rafId.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Delays setup for DOM readiness.
    const timeoutId = setTimeout(() => {
      // Attaches hover event listeners.
      setupEventListeners();
      // Starts listening for mouse moves.
      window.addEventListener("mousemove", manageMouseMove);
      // Starts the animation loop.
      rafId.current = window.requestAnimationFrame(animate);
    }, 100);

    return () => {
      // Cleans up on component unmount.
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* The custom cursor element. */}
      <div
        ref={circle}
        style={{
          width: size.current,
          height: size.current,
        }}
        className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none z-50 bg-accent"
      />
    </div>
  );
}
