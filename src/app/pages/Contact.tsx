import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { contact_bg } from "public";
import Link from "next/link";

/**
 * @component Contact
 * @description The final section of the page, designed to be a call to action.
 * It features a large, animated headline and a central "Message Me" button.
 * GSAP is used to create a staggered, scroll-triggered animation for the text
 * elements and social links, providing a polished and engaging conclusion
 * to the user's journey through the site.
 */
export default function Contact() {
  useGSAP(() => {
    // Splits main text into words.
    const splitContactWords = new SplitText("#contact-main", {
      type: "words",
    });

    // Creates the main animation timeline.
    const timeline = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
      },
      scrollTrigger: {
        trigger: "#contact-container",
        snap: 1,
        start: "top 30%",
        end: "bottom bottom",
      },
    });

    timeline
      // GSAP: Fades in message button.
      .fromTo(
        "#message-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      )
      // GSAP: Animates main text words.
      .fromTo(
        splitContactWords.words,
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.8 },
      )
      // GSAP: Fades in social media links.
      .fromTo(
        "#links",
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.8 },
      );
  });
  return (
    <section
      id="contact-container"
      className="page-size page-padding relative" // Main contact section container.
    >
      <>
        <div className="flex-center h-full">
          <p id="contact-main" className="contact-text w-400">
            {/* Animated main contact text. */}
            Discover your story with me
          </p>

          <div
            data-cursor-hover
            data-cursor-size="60"
            id="message-text"
            className="absolute bg-accent text-background w-50 h-50 rounded-full flex-center shadow-custom hover:scale-95 hover:text-accent hover:bg-background transition-all duration-300 cursor-pointer" // Interactive message me button.
          >
            <span className="text-2xl font-extrabold">Message Me</span>
          </div>
        </div>
      </>
      <>
        <div
          id="links"
          className="absolute top-100 -right-4 space-x-4 text-accent rotate-90" // Rotated social media links.
        >
          <Link
            data-cursor-hover
            data-cursor-size="40"
            href="https://www.github.com/rudra-xi"
            className="hover:text-white transition-all duration-300"
          >
            Github
          </Link>
          <Link
            data-cursor-hover
            data-cursor-size="40"
            href="https://www.linkedin.com/in/goutam-rudraxi/"
            className="hover:text-white transition-all duration-300"
          >
            LinkedIn
          </Link>
        </div>
      </>
      <>
        <Image
          src={contact_bg}
          alt="contact background"
          className="absolute inset-0 object-center object-cover -z-10" // Full-screen background image.
        />
      </>
    </section>
  );
}
