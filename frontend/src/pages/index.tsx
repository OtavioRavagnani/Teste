import { useContext , FormEvent} from "react"

import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/Home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from "../components/ui/Button"

import { AuthContext } from '../contexts/AuthContext'

import Link from "next/link"

export default function Home() {
    const {singIn} = useContext(AuthContext)

    async function handleLogin(event: FormEvent){
        event.preventDefault();

        let data = {
            email: "algum@test.com",
            password: "123123"
        }

        await singIn(data)
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
                        />

                        <Input
                            placeholder="Digite sua senha"
                            type="password"
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
