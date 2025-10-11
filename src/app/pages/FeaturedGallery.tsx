import { useState } from "react";
import { useGSAP, gsap, SplitText } from "@/lib/gsap";
import Image from "next/image";
import {
  featured_memoir_1,
  featured_memoir_2,
  featured_memoir_3,
  featured_memoir_4,
  featured_memoir_5,
  featured_memoir_6,
  featured_memoir_7,
} from "public";

/**
 * @component FeaturedGallery
 * @description An interactive gallery section that showcases featured works.
 * This component allows users to click on thumbnails to change the main
 * displayed image. It uses `useState` to manage the active image and GSAP
 * to create scroll-triggered animations for the title and descriptive text,
 * revealing the content as the user scrolls into the section.
 */
export default function FeaturedGallery() {
  // Manages the currently displayed image.
  const [selectedImage, setSelectedImage] = useState(featured_memoir_1);

  // Defines the gallery images.
  const images = [
    { src: featured_memoir_1, num: "01" },
    { src: featured_memoir_4, num: "02" },
    { src: featured_memoir_3, num: "03" },
    { src: featured_memoir_6, num: "04" },
    { src: featured_memoir_2, num: "05" },
    { src: featured_memoir_5, num: "06" },
    { src: featured_memoir_7, num: "07" },
  ];

  // Finds data for selected image.
  const selectedImageData =
    images.find((img) => img.src === selectedImage) || images[0];

  useGSAP(() => {
    // Splits page title for animation.
    const splitPageName = new SplitText("#page-feature", {
      type: "chars",
    });

    // Creates the main animation timeline.
    const timeline = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
      scrollTrigger: {
        trigger: "#featured-container",
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
      // GSAP: Animates main text block.
      .fromTo(
        "#main-text",
        { y: 460, opacity: 0 },
        { y: 330, opacity: 1, stagger: 0.5 },
      );
  });
  return (
    <section
      id="featured-container"
      className="page-size page-padding relative" // Main featured section container.
    >
      <>
        <span id="page-feature" className="text-6xl font-rosaline">
          {/* Animated page title. */}
          featured gallery
        </span>

        <div id="main-text" className="absolute translate-y-85">
          {/* Animated main text block. */}
          <span className="text-sm font-light">{selectedImageData.num}/07</span>
          <p className="text-4xl font-extrabold uppercase tracking-widest">
            Retro Girl
          </p>
          <p className="text-6xl font-extrabold uppercase">
            Solitaria Metropolis
          </p>
        </div>
      </>
      <>
        <div className="flex justify-end -mb-13">
          <Image
            data-cursor-hover
            data-cursor-size="110"
            src={selectedImage} // Displays the selected image.
            alt="featured images"
            className="h-130 w-110 object-cover -translate-y-16"
          />
        </div>
      </>
      <>
        <div className="flex-tween gap-3">
          {/* Container for image thumbnails. */}
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.src)}
              className={`transition-all duration-300 cursor-pointer ${
                selectedImage === image.src
                  ? "scale-101 border-t-4 border-accent"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                data-cursor-hover
                data-cursor-size="50"
                src={image.src}
                alt="images"
                className={`h-50 w-50 object-cover ${
                  selectedImage === image.src ? "grayscale-0" : "grayscale-100"
                }`}
              />
            </button>
          ))}
        </div>
      </>
    </section>
  );
}
