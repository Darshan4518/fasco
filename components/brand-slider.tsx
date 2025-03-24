export default function BrandSlider() {
  const brands = [
    { name: "CHANEL", logo: "CHANEL" },
    { name: "LOUIS VUITTON", logo: "LOUIS VUITTON" },
    { name: "PRADA", logo: "PRADA" },
    { name: "Calvin Klein", logo: "Calvin Klein" },
    { name: "DKNY", logo: "DKNY" },
  ]

  return (
    <div className="flex justify-between items-center">
      {brands.map((brand) => (
        <div key={brand.name} className="text-center">
          <span className="text-lg font-bold tracking-wider">{brand.logo}</span>
        </div>
      ))}
    </div>
  )
}

