function Logo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <img
        src="/logo.jpeg"
        alt="Logo"
        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
      />
    </div>
  );
}

export default Logo;
