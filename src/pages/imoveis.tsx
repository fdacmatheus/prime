import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { IoBedOutline } from 'react-icons/io5'
import { FaBath, FaCar } from 'react-icons/fa'
import { TbSquareRotated } from 'react-icons/tb'
import { MdLocationOn } from 'react-icons/md'
import propertiesData from '../api/properties-list.json'

export default function Imoveis() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'recent' | 'highPrice' | 'lowPrice'>('recent')
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [category, setCategory] = useState<'venda' | 'aluguel'>('venda')
  const [showPlanta, setShowPlanta] = useState<boolean>(false)
  
  const [maxPrice, setMaxPrice] = useState<number>(5000000)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedBairro, setSelectedBairro] = useState<string>('')
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null)
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(null)

  const { properties } = propertiesData

  const uniqueBairros = Array.from(new Set(properties.map(p => p.location.split(',')[0])))

  const filteredProperties = properties.filter(property => {
    if (property.category !== category) return false
    if (showPlanta && !property.naPlanta) return false
    if (property.price > maxPrice) return false
    const bairro = property.location.split(',')[0]
    if (selectedBairro && bairro !== selectedBairro) return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(property.type)) return false
    if (selectedBedrooms !== null) {
      if (selectedBedrooms === 5) {
        if (property.bedrooms < 5) return false
      } else if (property.bedrooms !== selectedBedrooms) return false
    }
    if (selectedBathrooms !== null) {
      if (selectedBathrooms === 4) {
        if (property.bathrooms < 4) return false
      } else if (property.bathrooms !== selectedBathrooms) return false
    }
    return true
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const aIsFavorite = favorites.includes(a.id)
    const bIsFavorite = favorites.includes(b.id)
    
    if (aIsFavorite && !bIsFavorite) return -1
    if (!aIsFavorite && bIsFavorite) return 1
    
    switch (sortBy) {
      case 'highPrice':
        return b.price - a.price
      case 'lowPrice':
        return a.price - b.price
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setMaxPrice(5000000)
    setSelectedTypes([])
    setSelectedBairro('')
    setSelectedBedrooms(null)
    setSelectedBathrooms(null)
    setShowPlanta(false)
  }

  const toggleFavorite = (propertyId: string, event: React.MouseEvent) => {
    event.preventDefault()
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-zinc-700 p-1">
            <button
              onClick={() => setCategory('venda')}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === 'venda'
                  ? 'bg-amber-500 text-black'
                  : 'text-white hover:bg-zinc-800'
              }`}
            >
              Venda
            </button>
            <button
              onClick={() => setCategory('aluguel')}
              className={`px-4 py-2 rounded-md transition-colors ${
                category === 'aluguel'
                  ? 'bg-amber-500 text-black'
                  : 'text-white hover:bg-zinc-800'
              }`}
            >
              Aluguel
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-400">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Imóvel' : 'Imóveis'} 
            {category === 'venda' ? ' à venda' : ' para alugar'}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setIsFilterMenuOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-amber-400' : 'text-zinc-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-amber-400' : 'text-zinc-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>

            <select 
              className="p-2 border rounded-md bg-zinc-800 text-white border-zinc-700 w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'highPrice' | 'lowPrice')}
            >
              <option value="recent">Recentes</option>
              <option value="highPrice">Maior preço</option>
              <option value="lowPrice">Menor preço</option>
            </select>
          </div>
        </div>

        <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-zinc-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isFilterMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-amber-400">Filtros</h2>
              <button 
                onClick={() => setIsFilterMenuOpen(false)}
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-amber-400 mb-2">
                  Valor máximo: R$ {maxPrice.toLocaleString('pt-BR')}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-amber-400
                    [&::-moz-range-thumb]:bg-amber-400
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full"
                />
              </div>

              <div>
                <label className="block text-amber-400 mb-2">
                  <div className="flex items-center gap-1">
                    <MdLocationOn className="w-5 h-5" />
                    <span>Bairro</span>
                  </div>
                </label>
                <select
                  value={selectedBairro}
                  onChange={(e) => setSelectedBairro(e.target.value)}
                  className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="">Todos os bairros</option>
                  {uniqueBairros.map(bairro => (
                    <option key={bairro} value={bairro}>
                      {bairro}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-amber-400 mb-2">Tipo do imóvel</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Casa', 'Apartamento'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTypes(prev => [...prev, type])
                          } else {
                            setSelectedTypes(prev => prev.filter(t => t !== type))
                          }
                        }}
                        className="form-checkbox text-amber-400"
                      />
                      <span className="text-white">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-amber-400 mb-2">Quartos</label>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4,5].map((num) => (
                    <button 
                      key={num}
                      onClick={() => setSelectedBedrooms(selectedBedrooms === num ? null : num)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedBedrooms === num 
                          ? 'border-amber-400 bg-amber-400 text-black' 
                          : 'border-zinc-700 text-white hover:border-amber-400'
                      }`}
                    >
                      {num === 5 ? '5+' : num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-amber-400 mb-2">Banheiros</label>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4].map((num) => (
                    <button 
                      key={num}
                      onClick={() => setSelectedBathrooms(selectedBathrooms === num ? null : num)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedBathrooms === num 
                          ? 'border-amber-400 bg-amber-400 text-black' 
                          : 'border-zinc-700 text-white hover:border-amber-400'
                      }`}
                    >
                      {num === 4 ? '4+' : num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPlanta}
                    onChange={(e) => setShowPlanta(e.target.checked)}
                    className="form-checkbox text-amber-400 rounded border-zinc-700"
                  />
                  <span>Apenas imóveis na planta</span>
                </label>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={clearFilters}
                  className="w-1/2 border border-amber-400 text-amber-400 py-3 rounded-lg font-medium hover:bg-amber-400 hover:text-black transition-colors"
                >
                  Limpar
                </button>
                <button 
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="w-1/2 bg-amber-500 text-black py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
          {sortedProperties.map((property) => (
            <a 
              key={property.id} 
              href={`/imoveis/${property.id}`}
              className="block bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img 
                  src={property.imageUrl} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.naPlanta && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-black px-2 py-1 rounded-md text-sm font-medium">
                    Na Planta
                  </div>
                )}
                <button 
                  className="absolute top-2 right-2 text-white p-2 rounded-full bg-black/50 hover:bg-amber-500/50 transition-colors"
                  onClick={(e) => toggleFavorite(property.id, e)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill={favorites.includes(property.id) ? "currentColor" : "none"} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <div className="text-sm text-zinc-400 mb-1">{property.id}</div>
                <div className="text-sm text-zinc-300 mb-2">{property.type}</div>
                <h3 className="font-bold mb-2 text-white">{property.title}</h3>
                <p className="text-sm text-zinc-400 mb-4 flex items-center gap-1">
                  <MdLocationOn className="w-4 h-4" />
                  {property.location}
                </p>
                
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <TbSquareRotated className="w-4 h-4" />
                    <span>{property.area}m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoBedOutline className="w-4 h-4" />
                    <span>{property.bedrooms} quartos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath className="w-4 h-4" />
                    <span>{property.bathrooms} banheiros</span>
                  </div>
                </div>

                <div className="font-bold text-lg text-amber-400">
                  {property.category === 'venda' 
                    ? `R$ ${property.price.toLocaleString('pt-BR')}`
                    : `R$ ${property.price.toLocaleString('pt-BR')}/mês`
                  }
                </div>
              </div>
            </a>
          ))}
        </div>

        {isFilterMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setIsFilterMenuOpen(false)}
          />
        )}

      </main>

      <Footer />
    </div>
  )
}