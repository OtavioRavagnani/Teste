import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [numberTable, setNumberTable] = useState<number>(null);
  const router = useRouter();
  async function orderCreate(event: FormEvent) {
    event.preventDefault();

    if (numberTable === null || numberTable === 0) {
      return toast.error("Preencha todos os dados");
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/order", {
      table: Number(numberTable),
    });

    toast.success("Mesa criada com sucesso!");
    setNumberTable(null);
  }

  return (
    <>
      <Head>
        <title>Nova mesa - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar mesa</h1>

          <form className={styles.form} onSubmit={orderCreate}>
            <input
              type="text"
              placeholder="Digite o número da mesa"
              className={styles.input}
              value={numberTable}
              onChange={(e) => setNumberTable(parseFloat(e.target.value))}
            />

            <button className={styles.buttonAdd} type="submit">
              Criar mesa
            </button>
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
