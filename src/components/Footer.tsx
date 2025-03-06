import Link from 'next/link'
import propertiesList from '@/api/properties-list.json'

export default function Footer() {
  // Pegar os últimos 4 imóveis
  const latestProperties = propertiesList.properties.slice(-4)

  return (
    <>
      <footer className="bg-zinc-950 text-zinc-400">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-amber-400 font-bold mb-4">Prime Imobiliária</h3>
              <p className="mb-4">
                Sua parceira ideal na busca pelo imóvel dos seus sonhos.
              </p>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/primeimoveis.ltda/" target="_blank" className="hover:text-amber-400">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/primeimoveis_oficial/" target="_blank" className="hover:text-amber-400">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-amber-400 font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-amber-400">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-400">
                    Imóveis
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-400">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-400">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-amber-400 font-bold mb-4">Nossos Imóveis</h3>
              <ul className="space-y-2">
                {latestProperties.map((property) => (
                  <li key={property.id}>
                    <Link href={`/imoveis/${property.id}`} className="hover:text-amber-400">
                      {property.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-amber-400 font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>Av dos Holandeses, bandeiras plaza, loja 15</li>
                <li>Olho D'água, São Luís - MA</li>
                <li>CEP: 65065-180</li>
                <li>Tel: (98) 99119-3199</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
            <p>&copy; 2024 Prime Imobiliária. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botão do WhatsApp */}
      <Link
        href="https://api.whatsapp.com/send?phone=5598991193199"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg animate-bounce"
      >
        <span className="sr-only">WhatsApp</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 448 512"
        >
          <path d="M380.9 97.1C339.1 55.3 283.1 32 224.1 32 100.3 32 0 132.3 0 256.1c0 45.3 12 90.1 34.8 129.9L0 512l127.7-36.6c37.6 20.6 80.7 31.2 124.6 31.2 123.8 0 224.1-100.3 224.1-224.1 0-59-23.3-115-65.3-157zM224.1 439.6c-34.5 0-68.2-9.5-97.7-27.5l-7.1-4.2-75.6 21.7 20.2-73.7-4.6-7.5c-20.2-33.1-30.9-71.6-30.9-110.5 0-109.9 89.4-199.3 199.3-199.3 53.2 0 103.2 20.7 141.1 58.4 37.9 37.6 59.1 87.5 59.1 141.1 0 109.9-89.4 199.3-199.3 199.3zm101.4-138.1c-5.6-2.8-33.2-16.4-38.4-18.3-5.2-1.8-9.1-2.8-13-2.8-3.2 0-7.1-0.2-10.8 0.2-3.7 0.4-9 2.8-13.7 6.5-4.8 3.7-18.3 18-22.4 21.8-4.1 3.7-7.7 4.2-14.3 1.8-6.6-2.4-27.9-10.3-53.1-32-19.6-15.9-32.7-35.5-36.4-41.2-3.7-5.8-0.4-8.9 2.7-11.7 2.8-2.8 6.6-7.1 9.9-10.6 3.3-3.7 4.4-5.8 6.6-9 2.1-3.2 1.1-5.9-0.6-8.3-1.7-2.4-13.8-33.4-19-45.8-5.2-12.3-10.4-10.7-14.3-10.9-3.7-0.2-8.3-0.2-12.7-0.2-4.1 0-10.8 1.6-16.5 7.2-5.6 5.6-21.2 20.7-21.2 50.5 0 29.9 21.7 58.7 24.7 62.9 3.2 4.1 44.1 67.3 107.1 94.3 59.7 24.9 59.7 16.6 70.3 15.6 10.7-1 33.2-13.5 37.9-26.6 4.8-13.2 4.8-24.5 3.4-26.6-1.3-2.1-5-3.3-10.6-6.1z" />
        </svg>
      </Link>
    </>
  );
}
