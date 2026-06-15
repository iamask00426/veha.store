

const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About VEHA Jewels", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Track Order", href: "#" },
      { label: "Returns & Exchanges", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Cancellation Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#c8b89a]">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C3A070] text-xl">♦</span>
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                VEHA Jewels
              </span>
            </div>
            <p className="text-sm text-[#9c9087] leading-relaxed mb-5">
              Discover extraordinary handcrafted jewelry. Your destination for
              authentic, certified fine jewelry and luxury timepieces.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#745B38] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F6EDE1]"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#745B38] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F6EDE1]"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#745B38] transition-colors"
                aria-label="Twitter"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F6EDE1]"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#9c9087] hover:text-[#C3A070] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Download App */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Download App
            </h4>
            <p className="text-xs text-[#9c9087] mb-3">Get exclusive app-only deals</p>
            <div className="space-y-2.5">
              <a
                href="#"
                className="flex items-center gap-2.5 px-3 py-2 bg-white/10 rounded-xl hover:bg-[#745B38]/60 transition-colors group"
              >
                <span className="text-xl">🍎</span>
                <div>
                  <p className="text-[10px] text-[#9c9087] group-hover:text-[#F6EDE1]">Download on the</p>
                  <p className="text-xs font-semibold text-white">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-3 py-2 bg-white/10 rounded-xl hover:bg-[#745B38]/60 transition-colors group"
              >
                <span className="text-xl">▶️</span>
                <div>
                  <p className="text-[10px] text-[#9c9087] group-hover:text-[#F6EDE1]">Get it on</p>
                  <p className="text-xs font-semibold text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b635a]">
            © {new Date().getFullYear()} VEHA Jewels. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {["🔒 Secure Payments", "✓ BIS Hallmarked", "⭐ 4.8/5 Rating", "🚚 Pan-India Delivery"].map(
              (badge) => (
                <span key={badge} className="text-xs text-[#6b635a] flex items-center gap-1">
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
