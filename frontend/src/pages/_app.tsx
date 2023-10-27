import '../../styles/globals.scss'
import { AppProps } from "next/app"

function Myapp({Component, pageProps}: AppProps){
  return <Component {...pageProps} />
}

export default Myapp