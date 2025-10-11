import { useState } from "react";
import { useGSAP, gsap, SplitText } from "@/lib/gsap";
import Image from "next/image";
import { services_1, services_2, services_3 } from "public";

/**
 * @component Services
 * @description An interactive section showcasing the different services offered.
 * This component uses `useState` to manage the currently selected service and
 * to prevent animation overlaps with a loading state. GSAP is used for two
 * main animations: a scroll-triggered timeline to reveal the entire section,
 * and a click-triggered timeline that smoothly transitions the text and image
 * when a new service is selected by the user.
 */
export default function Services() {
  // Manages the currently active service.
  const [selectedService, setSelectedService] = useState("Photography");
  // Prevents animation overlap on click.
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Defines the available services.
  const services = [
    {
      name: "Photography",
      image: services_1,
    },
    {
      name: "Graphic Design",
      image: services_2,
    },
    {
      name: "Videography",
      image: services_3,
    },
  ];

  // Finds the current service object.
  const currentService =
    services.find((service) => service.name === selectedService) || services[0];

  useGSAP(() => {
    // Splits text elements for animation.
    const splitPageName = new SplitText("#page-services", {
      type: "chars",
    });
    const splitMain = new SplitText("#service-main", {
      type: "chars",
    });
    const splitServicePara = new SplitText("#service-para", {
      type: "lines",
    });

    // Creates the main scroll-triggered timeline.
    const timeline = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
      },
      scrollTrigger: {
        trigger: "#services-container",
        snap: 1,
        start: "top 50%",
        end: "bottom bottom",
      },
    });

    timeline
      // GSAP: Animates the page title.
      .fromTo(
        splitPageName.chars,
        { opacity: 0, x: 5 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
        },
      )
      // GSAP: Animates the paragraph lines.
      .fromTo(
        splitServicePara.lines,
        { opacity: 0, y: 20 },

        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.5,
        },
      )
      // GSAP: Animates the main service name.
      .fromTo(
        splitMain.chars,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 },
      )
      // GSAP: Fades in the service image.
      .fromTo("#service-image", { opacity: 0 }, { opacity: 1, duration: 0.5 })
      // GSAP: Fades in the service list.
      .fromTo("#service-name", { opacity: 0 }, { opacity: 1, stagger: 0.1 });
  });

  // Handles changing the selected service.
  const handleServiceClick = async (serviceName: string) => {
    // Prevents re-triggering during animation.
    if (isImageLoading) return;

    setIsImageLoading(true);

    // Splits current text for exit animation.
    const currentSplit = new SplitText("#service-main", {
      type: "chars",
    });

    const clickTimeline = gsap.timeline();

    clickTimeline
      // GSAP: Animates out current service name.
      .to(currentSplit.chars, {
        duration: 0.3,
        opacity: 0,
        x: -20,
        stagger: 0.05,
        ease: "expo.inOut",
      })
      // GSAP: Rotates image during transition.
      .to(
        "#service-image",
        {
          duration: 0.3,
          rotation: -6,
          ease: "power4.inOut",
        },
        "-=0.2",
      )
      // Updates state after exit animation.
      .add(() => {
        setSelectedService(serviceName);
      })
      // Starts entry animation for new service.
      .add(() => {
        setTimeout(() => {
          const newSplit = new SplitText("#service-main", {
            type: "chars",
          });

          gsap
            .timeline()
            // GSAP: Rotates image back into place.
            .to("#service-image", {
              duration: 0.3,
              rotation: 6,
              ease: "power4.inOut",
            })
            .fromTo(
              newSplit.chars,
              // GSAP: Animates in new service name.
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "expo.inOut",
              },
              "-=0.2",
            )
            // Resets the loading state.
            .add(() => setIsImageLoading(false));
        }, 50);
      });
  };

  return (
    <section
      id="services-container"
      className="page-size page-padding relative" // Main services section container.
    >
      <>
        <span id="page-services" className="text-6xl font-rosaline">
          {/* Animated page title. */}
          services
        </span>
        <div className="flex-center translate-y-15">
          <span
            data-cursor-hover
            data-cursor-size="70" // Animated main service title.
            id="service-main"
            className="service-text -rotate-z-3"
          >
            {currentService.name}
          </span>
        </div>
        <div className="w-196 translate-y-70">
          <p id="service-para" className="text-xs">
            {/* Animated descriptive paragraph. */}
            Memoir Veritas offers professional photography services specializing
            in female portraiture, capturing{" "}
            <span
              data-cursor-hover
              data-cursor-size="30"
              className="text-sm font-rosaline text-accent"
            >
              authenticus
            </span>{" "}
            and artistic moments. She also provides{" "}
            <span
              data-cursor-hover
              data-cursor-size="30"
              className="text-sm font-rosaline text-accent"
            >
              videographie
            </span>
            , creating cinematic stories that bring images to life.
            Additionally, she offers{" "}
            <span
              data-cursor-hover
              data-cursor-size="30"
              className="text-sm font-rosaline text-accent"
            >
              design graphique
            </span>{" "}
            services to craft visually compelling branding and promotional
            materials. Every service is delivered with{" "}
            <span
              data-cursor-hover
              data-cursor-size="30"
              className="text-sm font-rosaline text-accent"
            >
              creativitas
            </span>{" "}
            and attention to detail.
          </p>
        </div>
        <div
          id="services"
          className="flex flex-col translate-x-270 translate-y-20 text-4xl absolute font-thin tracking-wider uppercase text-right" // Interactive service selection list.
        >
          {services.map((service, idx) => (
            <span
              data-cursor-hover
              data-cursor-size="70"
              key={idx}
              id="service-name"
              onClick={() => handleServiceClick(service.name)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedService === service.name
                  ? "text-accent font-normal scale-105"
                  : "opacity-70 hover:opacity-100 hover:scale-102"
              } ${isImageLoading ? "pointer-events-none opacity-50" : ""}`}
            >
              {service.name}
            </span>
          ))}
        </div>
      </>
      <>
        <div className="flex justify-center h-full">
          <Image
            data-cursor-hover // The main service image.
            data-cursor-size="110"
            id="service-image"
            src={currentService.image}
            alt={`${currentService.name} service`}
            className="h-90 w-90 object-cover rotate-6 z-10 -mt-75 transition-all duration-300"
            priority
          />
        </div>
      </>
    </section>
  );
}
