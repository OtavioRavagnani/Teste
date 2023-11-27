import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Register() {
  return (
    <>
      <Head>
        <title>Nova mesa - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <h1>olaa</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
