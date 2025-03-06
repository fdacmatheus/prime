import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import { IoBedOutline } from 'react-icons/io5'
import { FaBath } from 'react-icons/fa'
import propertiesData from '../../api/properties-details.json'

interface SchedulePopupProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
  };
  onClose: () => void;
}

function SchedulePopup({ property, onClose }: SchedulePopupProps) {
  const today = new Date().toISOString().split('T')[0]
  const [callDate] = useState(today)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{2})(\d)/, '($1) $2') // Adiciona parênteses
      .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona hífen
    setPhone(value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          selectedProperty: property.title, // Envia o título do imóvel
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para a planilha');
      }

      // Monta a mensagem do WhatsApp
      const message = `Olá, tenho interesse no imóvel:
Imóvel: ${property.title}
Bairro: ${property.location}
Data de chamado: ${callDate}
Preço: R$ ${property.price.toLocaleString('pt-BR')}

Meus dados:
Nome: ${name}
Telefone: ${phone}
Email: ${email}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = '5598991193199';
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Redireciona para o WhatsApp
      window.location.href = whatsappURL;

      // Limpar os campos após o envio (opcional)
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold text-white mb-4">Agendar Visita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Data de chamado preenchida automaticamente */}
          <div>
            <label className="block text-zinc-300 mb-1">Data de chamado</label>
            <input 
              type="date"
              value={callDate}
              readOnly
              className="w-full p-2 rounded bg-zinc-800 text-white"
            />
          </div>
          {/* Campos com as informações do imóvel */}
          <div>
            <label className="block text-zinc-300 mb-1">Imóvel</label>
            <input 
              type="text"
              value={property.title}
              readOnly
              className="w-full p-2 rounded bg-zinc-800 text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Bairro</label>
            <input 
              type="text"
              value={property.location}
              readOnly
              className="w-full p-2 rounded bg-zinc-800 text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Preço</label>
            <input 
              type="text"
              value={`R$ ${property.price.toLocaleString('pt-BR')}`}
              readOnly
              className="w-full p-2 rounded bg-zinc-800 text-white"
            />
          </div>
          {/* Campos para os dados do usuário */}
          <div>
            <label className="block text-zinc-300 mb-1">Seu Nome</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Telefone</label>
            <input 
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-2 rounded bg-zinc-800 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PropertyDetails() {
  const router = useRouter()
  const { id } = router.query
  const [activeImage, setActiveImage] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Encontra o imóvel com base no ID
  const property = propertiesData.properties.find(p => p.id === id)

  // Slide automático
  useEffect(() => {
    if (!property || !isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveImage((current) => 
        current === property.images.length - 1 ? 0 : current + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [property, isAutoPlaying])

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  // Se o imóvel não for encontrado
  if (!property) {
    return (
      <div className="min-h-screen bg-zinc-900">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold text-amber-400 mb-4">Imóvel não encontrado</h1>
            <button 
              onClick={() => router.push('/imoveis')}
              className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors"
            >
              Voltar para listagem
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span>/</span>
          <Link href="/imoveis" className="hover:text-amber-400">Imóveis</Link>
          <span>/</span>
          <span className="text-amber-400">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden relative">
              <img 
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-video bg-zinc-800 rounded-lg overflow-hidden relative ${
                    activeImage === index ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  <img 
                    src={image}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Imóvel */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
              <p className="text-zinc-400">{property.location}</p>
              <p className="text-2xl font-bold text-amber-400 mt-4">
                A partir de R$ {property.price.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-zinc-400">
                R$ {property.pricePerSquareMeter}/m²
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-800 rounded-xl">
              <div className="text-center">
                <p className="text-sm text-zinc-400">Área Total</p>
                <p className="text-lg font-bold text-white">{property.areaTotal}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-zinc-400 flex items-center justify-center gap-1">
                  <IoBedOutline className="w-4 h-4" />
                  Quartos
                </p>
                <p className="text-lg font-bold text-white">{property.bedrooms}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-zinc-400 flex items-center justify-center gap-1">
                  <FaBath className="w-4 h-4" />
                  Banheiros
                </p>
                <p className="text-lg font-bold text-white">{property.bathrooms}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowPopup(true)}
                className="flex-1 bg-amber-500 text-black py-3 px-6 rounded-xl font-medium hover:bg-amber-400 transition-colors"
              >
                Agendar Visita
              </button>
              <button className="p-3 text-white hover:text-amber-400 border border-zinc-700 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Sobre este imóvel</h2>
          <div className="prose prose-invert max-w-none">
            {property.description.split('\n').map((paragraph, index) => (
              <p key={index} className="text-zinc-300 mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="mt-16">
          <ContactForm />
        </div>
      </main>

      <Footer />

      {showPopup && <SchedulePopup property={property} onClose={() => setShowPopup(false)} />}
    </div>
  )
}
