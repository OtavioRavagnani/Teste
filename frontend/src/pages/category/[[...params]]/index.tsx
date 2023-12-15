import { useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import { Header } from "../../../components/Header";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "../../../utils/canSSRAuth";
import _ from "lodash";

export default function Category() {
  const route = useRouter();
  const [id, setId] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const { params } = route.query;
    (async () => {
      if (params) {
        await handleGetById(parseInt(params[0]));
      }
    })();
  }, []);

  async function handleGetById(id: number) {
    const apiClient = setupAPIClient();
    const result = (await apiClient.get(`/category/${id}`)).data;

    setId(result?.id);
    setName(result?.name);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/category", {
      id: id,
      name: name,
    });
    toast.success("Salvo com sucesso!");
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
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
