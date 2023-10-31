import '../../styles/globals.scss'
import { AppProps } from "next/app"

import { AuthProvider } from '../contexts/AuthContext'

function Myapp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default Myapp