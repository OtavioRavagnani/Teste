import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [number, setNumber] = useState("");

  async function orderCreate(event: FormEvent) {
    event.preventDefault();

    if (number === "") {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/order", {
      table: number,
    });

    toast.success("Mesa criada com sucesso!");
    setNumber("");
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
              type="number"
              placeholder="Digite o número da mesa"
              className={styles.input}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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
