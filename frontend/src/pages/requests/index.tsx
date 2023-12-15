import { useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { canSSRAuth } from "../../utils/canSSRAuth";

//-------------------------------------------------------------
interface Product {
  id: string;
  name: string;
}

interface Orders {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

//-------------------------------------------------------------

export default function Request() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [amountInput, setAmountInput] = useState<number>();
  const [orderInput, setOrderInput] = useState<number>();
  const [productInput, setProductInput] = useState<number>(1);

  //-------------------------------------------------------------
  useEffect(() => {
    getOrders().then((order) => setOrders(order));
    getProducts().then((products) => setProducts(products));
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

  async function getProducts() {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/category/product");
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Erro ao carregar produtos.");
      return [];
    }
  }

  function handleChangeOrder(event) {
    setOrderInput(event.target.value);
  }

  function handleChangeProduct(event) {
    setProductInput(event.target.value);
  }
  //-------------------------------------------------------------

  async function AddItens(event: FormEvent) {
    event.preventDefault();

    console.log("xxxxx", event);
    if (!orderInput || !productInput || !amountInput) {
      toast.error("Preencha todos os campos para adicionar itens à mesa.");
      return;
    }

    const apiClient = setupAPIClient();

    await apiClient
      .post("/order/add", {
        order_id: orderInput,
        product_id: productInput,
        amount: amountInput,
      })
      .then(() => {
        toast.success("Itens adicionados à mesa com sucesso!");
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
            <select
              className={styles.select}
              id="order"
              onChange={handleChangeOrder}
            >
              <option value="">Selecione a mesa</option>
              {orders.map((orders) => (
                <option key={orders.id} value={orders.id}>
                  {orders.table}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              id="product"
              onChange={handleChangeProduct}
            >
              <option value="">Selecione o produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              id="amount"
              type="number"
              placeholder="Quantidade"
              className={styles.input}
              value={amountInput}
              onChange={(e) => setAmountInput(parseInt(e.target.value))}
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
