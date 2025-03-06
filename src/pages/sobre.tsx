import Head from 'next/head'
import Image from 'next/image'

const Sobre = () => {
  return (
    <>
      <Head>
        <title>Sobre Nós | Prime Imobiliária</title>
        <meta name="description" content="Conheça a história e os valores da Prime Imobiliária" />
      </Head>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[400px] mb-16">
          <Image
            src="/sobre-hero.jpg" // Você precisará adicionar esta imagem
            alt="Prime Imobiliária"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Nossa História
            </h1>
          </div>
        </section>

        {/* Conteúdo Principal */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-amber-400 mb-6">
                Quem Somos
              </h2>
              <p className="text-gray-300 mb-4">
                A Prime Imobiliária nasceu do sonho de transformar a experiência de comprar, 
                vender e alugar imóveis em algo extraordinário. Desde nossa fundação, 
                temos nos dedicado a oferecer um serviço personalizado e de excelência 
                para cada um de nossos clientes.
              </p>
              <p className="text-gray-300">
                Com uma equipe altamente qualificada e anos de experiência no mercado 
                imobiliário, nos orgulhamos de ter ajudado centenas de famílias a 
                encontrarem o lar dos seus sonhos.
              </p>
            </section>

            {/* Missão, Visão e Valores */}
            <section className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-zinc-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Missão</h3>
                <p className="text-gray-300">
                  Proporcionar a melhor experiência na realização dos sonhos 
                  imobiliários de nossos clientes.
                </p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Visão</h3>
                <p className="text-gray-300">
                  Ser referência em excelência e inovação no mercado imobiliário brasileiro.
                </p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Valores</h3>
                <ul className="text-gray-300 list-disc list-inside">
                  <li>Ética e transparência</li>
                  <li>Excelência no atendimento</li>
                  <li>Compromisso com resultados</li>
                  <li>Inovação constante</li>
                </ul>
              </div>
            </section>

            {/* Contato */}
            <section className="bg-zinc-900 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-amber-400 mb-6">
                Entre em Contato
              </h2>
              <p className="text-gray-300 mb-6">
                Estamos sempre prontos para atender você da melhor forma possível. 
                Entre em contato conosco para saber mais sobre nossos serviços.
              </p>
              <div className="space-y-4">
                <p className="text-gray-300">
                  <span className="text-amber-400">Email:</span> contato@primeimobiliaria.com.br
                </p>
                <p className="text-gray-300">
                  <span className="text-amber-400">Telefone:</span> (11) 9999-9999
                </p>
                <p className="text-gray-300">
                  <span className="text-amber-400">Endereço:</span> Av. Principal, 1000 - São Paulo, SP
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default Sobre 