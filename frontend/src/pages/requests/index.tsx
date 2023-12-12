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

//-------------------------------------------------------------

export default function Category() {
  const [numberTable, setNumberTable] = useState<number>(null);
  const [category, setCategory] = useState<number | null>(null); // Store selected category ID
  const [categories, setCategories] = useState<Category[]>([]); // Store list of categories
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  async function getCategories() {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/category");
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Erro ao carregar categorias.");
      return [];
    }
  }

  async function newProduct(event: FormEvent) {
    event.preventDefault();

    if (!numberTable || !category) {
      toast.error("Preencha todos os campos.");
      return;
    }

    // Add your product adding logic here, using numberTable and category
    // ...

    toast.success("Pedido adicionado com sucesso!");
  }

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
            <input
              type="text"
              placeholder="Digite o número da mesa"
              className={styles.input}
              onChange={(event) => setNumberTable(Number(event.target.value))}
            />
            <select
              className={styles.select}
              id="category"
              onChange={(event) => setCategory(Number(event.target.value))}
            >
              <option value="">Selecione a categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className={styles.buttonAdd} type="submit">
              Adicionar o pedido
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
