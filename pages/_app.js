import Layout from '../components/layout/Layout'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {(addToCart) => <Component {...pageProps} addToCart={addToCart} />}
    </Layout>
  )
}
