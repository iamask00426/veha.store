import { Truck, Shield, Award, RefreshCw } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders above ₹499",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    subtitle: "Directly sourced from brands",
  },
  {
    icon: Award,
    title: "Certified Jewelry",
    subtitle: "Hallmarked gold & silver",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    subtitle: "Hassle-free 15-day returns",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-10 bg-[#F6EDE1]/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl shadow-sm border border-[#e4ddd2] hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#F6EDE1] rounded-full flex items-center justify-center">
                  <Icon size={22} className="text-[#745B38]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
