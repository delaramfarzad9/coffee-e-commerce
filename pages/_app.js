import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from "../context/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider>
    <CartProvider>
         <Layout>
       <Component {...pageProps}  />
    </Layout>
    </CartProvider>
    </ThemeProvider>
  )
}
