import { useState } from 'react';
import { useRouter } from 'next/router'; // Importa o useRouter
import propertiesData from '../api/properties-list.json'; // Importa a lista de propriedades

export default function ContactForm() {
  const router = useRouter(); // Inicializa o router
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{2})(\d)/, '($1) $2') // Adiciona parênteses
      .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona hífen
    setPhone(value);
  };

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
          selectedProperty,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para a planilha');
      }

      // Redireciona para a página de agradecimento
      router.push('/thank-you');

      // Limpar os campos após o envio (opcional, se você quiser manter os campos preenchidos)
      setName('');
      setEmail('');
      setPhone('');
      setSelectedProperty('');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      // Aqui você pode adicionar um tratamento de erro, se necessário
    }
  };

  return (
    <section className="py-16 bg-zinc-800 rounded-2xl px-4 md:px-8 mb-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-8">
          Vamos encontrar o imóvel ideal para você?
        </h2>
        <p className="text-zinc-300 text-center mb-12">
          Preencha o formulário abaixo e nossa equipe entrará em contato para entender melhor suas necessidades
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-amber-400 mb-2">Nome completo</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-amber-500/20 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div>
            <label className="block text-amber-400 mb-2">E-mail</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-zinc-900 border border-amber-500/20 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div>
            <label className="block text-amber-400 mb-2">Telefone</label>
            <input 
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-3 bg-zinc-900 border border-amber-500/20 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div>
            <label className="block text-amber-400 mb-2">Escolha um imóvel</label>
            <select 
              value={selectedProperty} 
              onChange={(e) => setSelectedProperty(e.target.value)} 
              className="w-full p-3 bg-zinc-900 border border-amber-500/20 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            >
              <option value="">Selecione um imóvel</option>
              {propertiesData.properties.map((property) => (
                <option key={property.id} value={property.title}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-amber-500 text-black py-3 px-6 rounded-xl font-medium hover:bg-amber-400 transition-colors">
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>
    </section>
  )
} 