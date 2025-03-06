interface PropertyCardProps {
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    imageUrl: string;
  }
  
  const PropertyCard = ({ 
    title, 
    price, 
    location, 
    bedrooms, 
    bathrooms, 
    area, 
    imageUrl 
  }: PropertyCardProps) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 hover:border-amber-500/50 transition-colors shadow-lg">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 mb-2">{title}</h3>
          <p className="text-amber-500 text-2xl font-bold mb-4">
            R$ {price.toLocaleString('pt-BR')}
          </p>
          <p className="text-zinc-600 mb-4">{location}</p>
          
          <div className="flex items-center gap-4 text-zinc-700">
            <span>{bedrooms} Quartos</span>
            <span>{bathrooms} Banheiros</span>
            <span>{area}m²</span>
          </div>
        </div>
      </div>
    )
  }
  
  export default PropertyCard