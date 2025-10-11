import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { profile_1, profile_2, profile_3 } from "public";

/**
 * @component Profile
 * @description Presents the artist's biography and visual identity.
 * This component uses GSAP to create a dynamic, scroll-triggered entrance
 * animation. It sequentially animates the title, a descriptive paragraph,
 * a large central text, and a cascade of profile images, creating a
 * narrative-rich introduction to the artist as the user scrolls.
 */
export default function Profile() {
  useGSAP(() => {
    // Splits page title for animation.
    const splitPageName = new SplitText("#page-profile", {
      type: "chars",
    });
    // Splits paragraph text for animation.
    const splitProfilePara = new SplitText("#profile-para", {
      type: "lines",
    });

    // Creates main animation timeline.
    const timeline = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
      },
      scrollTrigger: {
        trigger: "#profile-container",
        snap: 1,
        start: "top 50%",
        end: "bottom bottom",
      },
    });

    timeline
      // GSAP: Animates page title characters.
      .fromTo(
        splitPageName.chars,
        { opacity: 0, x: 5 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 },
      )
      // GSAP: Animates paragraph lines in.
      .fromTo(
        splitProfilePara.lines,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.02 },
      )
      // GSAP: Animates images dropping down.
      .fromTo(
        ".profile-img",
        { y: -1100 },
        {
          y: -340,
          clearPops: "all",
          stagger: 0.5,
          duration: 1.5,
        },
      )
      // GSAP: Animates main text sliding in.
      .fromTo(
        "#profile-main",
        { x: 1610 },
        {
          x: 0,
          duration: 1.8,
        },
      );
  });
  return (
    <section
      id="profile-container"
      className="page-size page-padding relative" // Main profile section container.
    >
      <>
        <span id="page-profile" className="text-6xl font-rosaline">
          {/* Animated page title. */}
          profile
        </span>

        <div className="w-186 text-justify translate-x-30 translate-y-48">
          <p
            id="profile-para"
            className="font-light text-sm text-justify" // Animated descriptive paragraph.
          >
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              Memoir Veritas
            </span>{" "}
            is a professional photographer specializing in portraits of female
            models, capturing genuine emotions and stories through her lens.
            Born in Provence, her passion was ignited by the inspiring work of
            photographer{" "}
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              Isabelle Laurent
            </span>
            . She blends classical and modern styles, focusing on natural lumen
            to create images with{" "}
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              "éclat"
            </span>
            —a brilliant glow. Through her unique perspective, she tells
            intimate stories with{" "}
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              truth ("veritas")
            </span>{" "}
            and{" "}
            <span
              data-cursor-hover
              data-cursor-size="50"
              className="font-rosaline text-lg text-accent"
            >
              memory ("memoria")
            </span>
            , making each portrait a timeless expression of beauty and emotion.
            Her work invites viewers to feel a connection beyond the image,
            revealing the soul behind every gaze. Committed to her craft, she
            continuously evolves her art to reflect authenticity and passion.
          </p>
        </div>
        <div className="translate-y-75 flex-center -rotate-z-3">
          <span id="profile-main" className="profile-text">
            {/* Animated main profile text. */}
            Memoir Veritas
          </span>
        </div>
      </>

      <>
        <div
          data-cursor-hover
          data-cursor-size="90"
          className="absolute flex" // Container for animated images.
        >
          <Image
            src={profile_1}
            alt="profile 1"
            className="profile-img h-110 w-auto shadow-custom translate-x-265 -translate-y-85 rotate-z-6"
          />
          <Image
            src={profile_2}
            alt="profile 2"
            className="profile-img h-110 w-auto shadow-custom translate-x-190 -translate-y-85 rotate-z-18"
          />
          <Image
            src={profile_3}
            alt="profile 3"
            className="profile-img h-110 w-auto shadow-custom translate-x-120 -translate-y-85 -rotate-z-12"
          />
        </div>
      </>
    </section>
  );
}
