import Image from "next/image";
import { logo } from "public";

/**
 * @component Navbar
 * @description Renders the main navigation bar for the application.
 * This component is positioned absolutely at the top of the page and
 * displays the site's logo and title. It also integrates with the
 * custom cursor by using `data-cursor-hover` attributes to provide
 * interactive visual feedback on hover.
 */
export default function Navbar() {
  return (
    <nav className="px-10 py-3 absolute w-full">
      {" "}
      {/* Main navigation container. */}
      <div className="flex-tween">
        {" "}
        {/* Flex container for items. */}
        <Image
          data-cursor-hover
          data-cursor-size="60"
          src={logo}
          alt="logo"
          className="h-12 w-auto" // Displays the site logo.
        />
        <span
          data-cursor-hover
          data-cursor-size="60"
          className="font-rosaline text-4xl" // Displays the site title.
        >
          memoir veritas
        </span>
      </div>
    </nav>
  );
}
