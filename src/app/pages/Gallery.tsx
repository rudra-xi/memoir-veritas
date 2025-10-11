import Image from "next/image";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import {
	gallery_memoir_1,
	gallery_memoir_2,
	gallery_memoir_3,
	gallery_memoir_4,
	gallery_memoir_5,
	gallery_memoir_6,
	gallery_memoir_7,
	gallery_memoir_8,
	gallery_memoir_9,
} from "public";

export default function Gallery() {
	/**
	 * @component Gallery
	 * @description Displays a photographic work gallery in a grid layout.
	 * This component uses GSAP and the SplitText plugin to create engaging
	 * scroll-triggered animations. The main title animates character by
	 * character, followed by the images fading in randomly, creating a
	 * dynamic presentation as the user scrolls into view.
	 */
	useGSAP(() => {
		const splitMain = new SplitText("#gallery-main", {
			type: "chars",
		}); // Splits title for animation.

		const timeline = gsap.timeline({
			defaults: {
				ease: "expo.inOut",
			},
			scrollTrigger: {
				trigger: "#gallery-container",
				snap: 1,
				start: "top 70%",
				end: "bottom bottom",
			},
		}); // Creates main animation timeline.
		timeline
			// GSAP: Animates title characters in.
			.fromTo(
				splitMain.chars,
				{ opacity: 0, x: 5 },
				{
					opacity: 1,
					x: 0,
					duration: 0.4,
					stagger: 0.05,
					delay: 1.5,
				}
			)
			// GSAP: Fades in grid images randomly.
			.fromTo(
				".grid-images",
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 0.2,
					ease: "sine.in",
					stagger: { each: 0.2, from: "random" },
				}
			);
	});
	return (
		<section id="gallery-container" className="page-size page-padding ">
			{/* Main gallery section container. */}
			<>
				<div className="translate-y-145">
					<span id="gallery-main" className="gallery-text">
						{/* Animated main gallery title. */}
						Pinacotheca
					</span>
				</div>
			</>
			<>
				<div className="-translate-y-50">
					<div className="grid grid-cols-6 grid-rows-3 gap-2">
						{/* Grid layout for images. */}
						<div className="grid-images group relative overflow-hidden">
							{/* Container for an image. */}
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_1}
									placeholder="blur"
									alt="gallery 1"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								{/* Image caption text. */}
								Neon Submergence
							</span>
						</div>
						<div />
						<div />
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_5}
									placeholder="blur"
									alt="gallery 5"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Midnight at the Grand Piano
							</span>
						</div>
						<div />
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_4}
									placeholder="blur"
									alt="gallery 4"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Over the Shoulder
							</span>
						</div>
						<div />
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_8}
									alt="gallery 8"
									placeholder="blur"
									className="h-40 w-60 object-cover object-top transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Sun-Dappled Confidante
							</span>
						</div>
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_2}
									placeholder="blur"
									alt="gallery 2"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Veiled Ascent
							</span>
						</div>
						<div />
						<div />
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_6}
									alt="gallery 6"
									placeholder="blur"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Glacial Gaze
							</span>
						</div>
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_3}
									placeholder="blur"
									alt="gallery 3"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Sackcloth on the Slag
							</span>
						</div>
						<div />
						<div />
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_7}
									alt="gallery 7"
									placeholder="blur"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								Split-Light Reflection
							</span>
						</div>
						<div className="grid-images group relative overflow-hidden">
							<div className="h-40 w-60 overflow-hidden">
								<Image
									data-cursor-hover
									data-cursor-size="70"
									src={gallery_memoir_9}
									placeholder="blur"
									alt="gallery 9"
									className="h-40 w-60 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<span className="text-xs text-accent">
								The Pearl and the Palm
							</span>
						</div>
						<div />
					</div>
				</div>
			</>
		</section>
	);
}
