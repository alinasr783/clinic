import {Link} from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const navigationLinks = [
    {name: "Services", href: "#services"},
    {name: "About", href: "#about"},
    {name: "Doctors", href: "#doctors"},
    {name: "Gallery", href: "#works"},
    {name: "Contact", href: "#contact"},
  ];

  return (
    <footer className="bg-dark-2 p-4 rounded-2xl">
      <nav className="flex flex-wrap justify-center md:justify-center gap-6 lg:gap-8">
        {navigationLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-xs sm:text-sm text-gray-300 
              hover:text-white transition-colors duration-200">
            {link.name}
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
