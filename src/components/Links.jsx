function Links({items, gapClass = "gap-8", className = ""}) {
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <nav
      className={`hidden md:flex items-center text-sm 
        text-gray-300 ${gapClass} ${className}`}>
      {items.map(({href, label}) => (
        <a
          key={href}
          href={href}
          onClick={(e) => handleSmoothScroll(e, href)}
          className="hover:text-white transition-colors cursor-pointer">
          {label}
        </a>
      ))}
    </nav>
  );
}

export default Links;
