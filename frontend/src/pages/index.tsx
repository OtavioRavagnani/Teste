import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/Home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { text } from "stream/consumers"

export default function Home() {
    return (
        <>
            <Head>
                <title>SujeitoPizza - Faça seu login</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <form>
                        <Input
                        placeholder="Digite seu email"
                        type="text"
                        />
                        
                        <Input
                        placeholder="Digite sua senha"
                        type="password"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
