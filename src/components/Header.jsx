import Logo from "./Logo";
import Links from "./Links";
import {MessageCircle, Send} from "lucide-react";

function Header() {
  return (
    <header className="px-1 sm:px-2 md:px-4">
      <div className="flex md:hidden items-center justify-start gap-2 sm:gap-4 py-2 sm:py-3">
        <Logo />
        <a
          href="tel:+79859201221"
          className="text-xs sm:text-sm text-white whitespace-nowrap">
          +7 (985) 920 1221
        </a>
      </div>

      <div className="hidden md:flex items-center justify-between">
        <Links
          items={[
            {href: "#services", label: "Services"},
            {href: "#about", label: "About Us"},
            {href: "#works", label: "Gallery"},
          ]}
          gapClass="gap-8"
        />

        <Logo />

        <div className="flex items-center gap-4 md:gap-6">
          <Links
            items={[
              {href: "#promo", label: "Promotions"},
              {href: "#contacts", label: "Contacts"},
            ]}
            gapClass="gap-6"
          />

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="h-9 w-9 rounded-full border border-white/20 flex 
              items-center justify-center hover:border-white/40 transition-colors">
            <MessageCircle className="w-4 h-4 text-white" />
          </a>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors">
            <Send className="w-4 h-4 text-white" />
          </a>

          <a
            href="tel:+79859201221"
            className="text-sm text-white whitespace-nowrap">
            +7 (985) 920 1221
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
