import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { hero_bg, hero_1, hero_2 } from "public";

/**
 * @component Home
 * @description The main hero section that serves as the website's entry point.
 * This component creates a strong first impression with a large, animated title,
 * introductory text, and hero images. It uses GSAP to orchestrate a sequential
 * entrance animation for all its elements, revealing the content as the
 * page loads.
 */
export default function Home() {
  useGSAP(() => {
    // Splits text elements for animation.
    const splitPara = new SplitText("#home-para", { type: "lines" });
    const splitMain = new SplitText("#home-main", {
      type: "chars, words",
    });

    // Creates the main animation timeline.
    const timeline = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
      scrollTrigger: {
        trigger: "#home-container",
        snap: 1,
        start: "-1% top",
        end: "bottom top",
      },
    });

    timeline
      // GSAP: Animates paragraph lines in.
      .fromTo(
        splitPara.lines,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
        },
      )
      // GSAP: Animates main title characters.
      .fromTo(
        splitMain.chars,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
        },
      )
      // GSAP: Fades in the second image.
      .fromTo(
        "#hero-img-2",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
      )
      // GSAP: Fades in the first image.
      .fromTo(
        "#hero-img-1",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
      )
      // GSAP: Fades in second image name.
      .fromTo(
        "#img-name-2",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
        },
      )
      // GSAP: Fades in first image name.
      .fromTo(
        "#img-name-1",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
      );
  });
  return (
    <section
      id="home-container"
      className="page-size home-page-padding relative" // Main home section container.
    >
      <>
        <div className="flex justify-end translate-y-10 -translate-x-10">
          <p
            id="home-para"
            className="w-115 text-sm leading-6 text-right place-content-end" // Animated introductory paragraph.
          >
            Memoir Veritas combines French and Latin—
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              “Memoir”
            </span>{" "}
            means personal story, and{" "}
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              “Veritas”
            </span>{" "}
            means truth. She tells stories through her unique photographic
            perspective. Born in Provence, she is a professional photographer
            capturing authentic moments with artistry.
          </p>
        </div>
        <div className="translate-y-90 flex-center">
          <span id="home-main" className="home-text">
            {" "}
            {/* Animated main hero text. */}
            Memoir Veritas
          </span>
        </div>
      </>
      <>
        <div className="flex-tween px-25">
          <div className="-translate-y-20">
            <span id="img-name-2" className="font-light uppercase text-xs">
              Rêve
            </span>
            <Image
              data-cursor-hover
              data-cursor-size="90"
              id="hero-img-2"
              src={hero_2}
              alt="hero 2"
              className="h-70 w-auto shadow-custom origin-center" // The second animated hero image.
            />
          </div>
          <div className="-translate-y-10">
            <span id="img-name-1" className="font-light uppercase text-xs">
              Vividus
            </span>
            <Image
              data-cursor-hover
              data-cursor-size="60"
              id="hero-img-1"
              src={hero_1}
              alt="hero 1"
              className="h-70 w-auto shadow-custom" // The first animated hero image.
            />
          </div>
        </div>
      </>
      <>
        <Image
          src={hero_bg}
          alt="hero background"
          className="absolute inset-0 object-center object-cover -z-10" // Full-screen background image.
        />
      </>
    </section>
  );
}
