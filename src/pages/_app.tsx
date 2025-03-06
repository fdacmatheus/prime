import type { AppProps } from 'next/app'
import '../app/globals.css'
import SEO from '@/components/SEO'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-NX7GRK7G"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Component {...pageProps} />
    </>
  )
} 