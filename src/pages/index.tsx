import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import Link from 'next/link'
import propertiesData from '../api/properties-list.json'
import SEO from '@/components/SEO'

export default function Home() {
  // Adicionar estado para animação de scroll
  const [animatedCards, setAnimatedCards] = useState(false)

  useEffect(() => {
    // Configurar tema escuro por padrão
    document.documentElement.classList.add('dark')
    
    // Adicionar listener para animação no scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 300) {
        setAnimatedCards(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Selecionar 3 imóveis em destaque
  const featuredProperties = propertiesData.properties.slice(0, 3)

  return (
    <div className="min-h-screen bg-zinc-900 transition-colors">
      <SEO 
        title="Prime Imobiliária - Imóveis em São Luís do Maranhão"
        description="Sua parceira ideal na busca pelo imóvel dos seus sonhos em São Luís - MA. Casas, apartamentos e terrenos à venda e aluguel."
        canonical="https://primeimoveisslz.com.br"
      />
      <Header />
      
      {/* Seção hero com imagem de fundo */}
      <section className="relative h-[700px]">
        <div className="absolute inset-0">
          <img 
            src="/banner.webp" 
            alt="Família feliz com corretor de imóveis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl font-bold text-amber-400 mb-6 leading-tight">
            Encontre o Lugar Perfeito<br/>para Chamar de Lar
          </h1>
          <p className="text-white text-xl mb-12 max-w-2xl">
            Descubra imóveis exclusivos que combinam com seu estilo de vida. 
            Temos as melhores opções para você e sua família.
          </p>
          
          <Link 
            href="/imoveis" 
            className="bg-amber-500 hover:bg-amber-400 text-black px-12 py-4 rounded-xl text-lg font-medium transition-colors"
          >
            Ver todos os imóveis
          </Link>
        </div>
      </section>

      {/* Seção de imóveis em destaque */}
      <main className="container mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Conheça nossos imóveis
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Selecionamos os melhores imóveis para você. Conheça nossas opções exclusivas em localizações privilegiadas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div 
                key={property.id}
                className={`transform transition-all duration-700 ${
                  animatedCards ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              >
                <Link 
                  href={`/imoveis/${property.id}`}
                  className="block bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Carrossel de imagens */}
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
                      onClick={(e) => {
                        e.preventDefault()
                        // Adicionar lógica de favoritos aqui
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Informações do imóvel */}
                  <div className="p-4">
                    <div className="text-sm text-zinc-400 mb-1">{property.id}</div>
                    <div className="text-sm text-zinc-300 mb-2">{property.type}</div>
                    <h3 className="font-bold mb-2 text-white">{property.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{property.location}</p>
                    
                    <div className="flex gap-4 text-sm text-zinc-400 mb-4">
                      <span>{property.area}m²</span>
                      <span>{property.bedrooms} Quartos</span>
                      <span>{property.bathrooms} Banheiro</span>
                    </div>

                    <div className="font-bold text-lg text-amber-400">
                      R$ {property.price.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              href="/imoveis" 
              className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Ver todos os imóveis
            </Link>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  )
}