// ProductInternalLinks — Related products ke beech SEO backlinks
// Sab links dsecuretech.com pe point karte hain
import { PRODUCT_LINKS } from "@/lib/constants";

interface ProductInternalLinksProps {
  heading?: string;
  currentProduct?: string;
}

export default function ProductInternalLinks({
  heading = "Related D-Secure Products",
  currentProduct,
}: Readonly<ProductInternalLinksProps>) {
  // Current product ko hata kar baaki products dikhao (max 8)
  const displayLinks = Object.entries(PRODUCT_LINKS)
    .filter(([key]) => key !== currentProduct)
    .slice(0, 8)
    .map(([, value]) => value);

  if (displayLinks.length === 0) return null;

  return (
    <section
      aria-label="Related D-Secure Products"
      className="py-12 px-6 bg-gradient-to-br from-orange-50/50 to-blue-50/50 border-t border-slate-200"
    >
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          {heading}
        </h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Explore the full D-Secure data security suite
        </p>

        {/* Product link grid — har link dsecuretech.com pe jaata hai */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayLinks.map((product) => (
            <a
              key={product.href}
              href={product.href}
              className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200"
              title={`${product.label} — D-Secure Data Security`}
            >
              {/* Icon */}
              <span className="text-2xl leading-none flex-shrink-0 mt-0.5">
                {product.icon}
              </span>
              <div>
                <span className="block font-semibold text-slate-900 text-sm group-hover:text-orange-700 transition-colors">
                  {product.label}
                </span>
                <span className="block text-slate-500 text-xs leading-relaxed mt-1">
                  {product.description}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
