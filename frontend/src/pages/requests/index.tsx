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
  const [numberTable, setNumberTable] = useState<number>(null);
  const [product, setProduct] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [amount, setAmount] = useState<number>(1);

  //-------------------------------------------------------------

  //-------------------------------------------------------------
  // Fetch categories on component mount
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

  async function newProduct(event: FormEvent) {
    event.preventDefault();

    if (!numberTable || !product || !amount) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const apiClient = setupAPIClient();

    // Replace placeholder with actual API call to add product to order
    const response = await apiClient.post("/order/product", {
      order_id: numberTable,
      product_id: product,
      amount: amount,
    });

    if (response.status === 200) {
      toast.success("Pedido adicionado com sucesso!");
      // Clear form inputs
      setNumberTable(null);
      setProduct(null);
      setAmount(1);
    } else {
      toast.error("Erro ao adicionar produto.");
    }
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
          <form className={styles.form} onSubmit={newProduct}>
            <select className={styles.select} id="orders">
              {orders.map((orders) => (
                <option key={orders.id} value={orders.id}>
                  {orders.id}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              id="category"
              onChange={(event) => setProduct(Number(event.target.value))}
            >
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
              min={1} // Set minimum quantity to 1
              onChange={(event) => setAmount(Number(event.target.value))}
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
