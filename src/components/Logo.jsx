function Logo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width="26"
        height="20"
        viewBox="0 0 26 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 10c5-6 17-6 22 0"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 14c3-3 11-3 14 0"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center leading-tight">
        <div className="text-xs tracking-[0.2em] text-gray-300">
          NATURA SMILE
        </div>
        <div className="text-[10px] tracking-[0.18em] text-gray-400">
          DENTAL CLINIC
        </div>
      </div>
    </div>
  );
}

export default Logo;
