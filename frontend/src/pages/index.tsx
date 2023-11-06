import { useContext, FormEvent, useState } from "react"

import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/Home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from "../components/ui/Button"
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext'

import Link from "next/link"

import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
    const { singIn } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (email === '' || password === '') {
            toast.warning("Preencha todos os campos")
            return;
        }

        setLoading(true);

        let data = {
            email,
            password
        }

        await singIn(data)

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>SujeitoPizza - Faça seu login</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <form onSubmit={handleLogin}>
                        <Input
                            placeholder="Digite seu email"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            type="submit"
                            loading={false}
                        >
                            Acessar
                        </Button>
                    </form>

                    <Link href='/singup' legacyBehavior>
                        <a className={styles.text}>Nao possui uma conta ? Cadastre-se</a>
                    </Link>

                </div>
            </div>
        </>
    )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {

    return {
        props: {
          title: 'My Title',
          content: '...'
        }
      }
})
