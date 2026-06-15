interface BadgeProps {
  label: string;
  variant: "new" | "bestseller" | "bogo" | "sale" | "exclusive" | "trending" | "virtual" | "sameday";
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  new: "bg-blue-500 text-white",
  bestseller: "bg-[#D06780] text-[#FDE9EC]",
  bogo: "bg-green-600 text-white",
  sale: "bg-red-500 text-white",
  exclusive: "bg-purple-600 text-white",
  trending: "bg-orange-500 text-white",
  virtual: "bg-violet-600 text-white",
  sameday: "bg-sky-500 text-white",
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-tight ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
