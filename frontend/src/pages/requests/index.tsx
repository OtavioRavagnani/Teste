import { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { api } from "../../services/apiClient";

type CategoryProps = {
  id: string;
  name: string;
};

export default function Category() {
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();

  const [amount, setAmount] = useState("1");

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get("/category");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }
  }, []);

  const router = useRouter();
  //-----------------------------------------------------------------
  async function orderRequest() {}
  //-----------------------------------------------------------------

  return (
    <>
      <Head>
        <title>Nova pedido - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar novo pedido</h1>

          <form className={styles.form} onSubmit={orderRequest}>
            <input
              type="text"
              placeholder="Digite o número da mesa"
              className={styles.input}
              //  value={numberTable}
              //  onChange={(e) => setNumberTable(parseFloat(e.target.value))}
            />

            <select className={styles.selectProduct}>
              <option>{categorySelected?.name}</option>
            </select>

            <input
              type="number"
              placeholder="Digite a quantidadade do produto"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Anotar o pedido
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
