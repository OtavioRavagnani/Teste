import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [number, setNumber] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (number === "") {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/order", {
      table: number,
    });

    toast.success("Pedido criado com sucesso!");
    setNumber("");
  }

  return (
    <>
      <Head>
        <title>Nova pedido - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar pedido</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o número do pedido"
              className={styles.input}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Criar pedido
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
