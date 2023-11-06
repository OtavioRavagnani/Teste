import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import {FiLogOut} from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

    const { user } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/Dashboard">
                <img src="/logo.svg" width={190} height={60 }/>
                </Link>

                <h1>{user?.name}</h1>

                <nav className={styles.menuNav}>
                    <Link href="/category">
                    <a>Categorya</a>
                    </Link>

                    <Link href="/product">
                    <a>Cardapio</a>
                    </Link>
                    
                    <button>
                        <FiLogOut color="#fff" size={24}/>
                    </button>

                </nav>

            </div>
        </header>
    )
}