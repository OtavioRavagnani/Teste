import { useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { canSSRAuth } from "../../utils/canSSRAuth";

//-------------------------------------------------------------
interface Category {
  id: string; // Substitua por propriedades reais do seu objeto Category
  name: string;
  // ... outras propriedades
}

type Orders = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

//-------------------------------------------------------------

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [amount, setAmount] = useState<number>(1);

  //-------------------------------------------------------------
  useEffect(() => {
    getOrders().then((order) => setOrders(order));
  }, []);

  //-------------------------------------------------------------
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  //-------------------------------------------------------------

  async function getOrders() {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/orders");
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Erro ao carregar mesas.");
      return [];
    }
  }

  //-------------------------------------------------------------

  async function getCategories() {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/category/product");
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Erro ao carregar categorias.");
      return [];
    }
  }

  //-------------------------------------------------------------

  async function AddItens(event: FormEvent) {
    event.preventDefault();

    if (!orders || !categories || !amount) {
      toast.error("Preencha todos os campos para adicionar itens à mesa.");
      return;
    }

    const apiClient = setupAPIClient();

    await apiClient
      .post("/order/add", {
        order_id: orders,
        product_id: categories,
        amount: amount,
      })
      .then(() => {
        toast.success("Itens adicionados à mesa com sucesso!");
        // Atualize a lista de itens da mesa
        getOrders();
      })
      .catch((error) => {
        toast.error("Erro ao adicionar itens à mesa.");
        console.error(error); // Log o erro para investigação posterior
      });
  }

  //-------------------------------------------------------------
  return (
    <>
      <Head>
        <title>Adicionar produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Adicionar produto</h1>
          <form className={styles.form} onSubmit={AddItens}>
            <select className={styles.select} id="orders">
              <option value="">Selecione a mesa</option>
              {orders.map((orders) => (
                <option key={orders.id} value={orders.id}>
                  {orders.table}
                </option>
              ))}
            </select>

            <select className={styles.select} id="category">
              <option value="">Selecione o produto</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantidade"
              className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">
              Adicionar ao pedido
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

//-------------------------------------------------------------

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
