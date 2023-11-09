import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <select>
              <option>Bebida</option>
              <option>Pizzas</option>
              <input type="tex" placeholder="Digite o nome do produto" />
              <input type="tex" placeholder="Preço do produto" />
            </select>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
