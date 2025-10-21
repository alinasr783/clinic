function Links({items, gapClass = "gap-8", className = ""}) {
  return (
    <nav
      className={`hidden md:flex items-center text-sm 
        text-gray-300 ${gapClass} ${className}`}>
      {items.map(({href, label}) => (
        <a
          key={href}
          href={href}
          className="hover:text-white transition-colors">
          {label}
        </a>
      ))}
    </nav>
  );
}

export default Links;
