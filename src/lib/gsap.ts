// Imports the core GSAP library.
import { gsap } from "gsap";
// Imports the React hook for GSAP.
import { useGSAP } from "@gsap/react";
// Imports the ScrollTrigger plugin.
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Imports the SplitText plugin.
import { SplitText } from "gsap/SplitText";

/**
 * @file gsap.ts
 * @description Centralizes the GSAP (GreenSock Animation Platform) library and its plugins.
 * This module registers all necessary GSAP plugins like ScrollTrigger,
 * ScrollSmoother, and SplitText, and then re-exports them. This approach
 * ensures that plugins are registered only once and provides a single,
 * consistent import source for all animation-related utilities across the application.
 */

// GSAP: Registers all required plugins.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Exports GSAP and plugins.
export { gsap, useGSAP, ScrollTrigger, SplitText };
