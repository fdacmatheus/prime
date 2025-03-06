import SEO from '@/components/SEO'
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-center">
      <SEO 
        title="Obrigado pelo contato | Prime Imobiliária"
        description="Agradecemos seu contato. Nossa equipe retornará em breve."
        canonical="https://primeimoveisslz.com.br/thank-you"
        noindex={true}
      />
      <h1 className="text-4xl font-bold text-amber-400 mb-4">Obrigado!</h1>
      <p className="text-zinc-300 mb-8">Sua mensagem foi enviada com sucesso. Em breve, nossa equipe entrará em contato.</p>
      <Link href="/" className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl">
        Voltar para a página inicial
      </Link>
    </div>
  );
} 