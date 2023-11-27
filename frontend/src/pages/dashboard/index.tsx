import { useState } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import styles from "./styles.module.scss";

import { Header } from "../../components/Header";
import { FiRefreshCcw, FiPlusSquare, FiXCircle, FiEdit3 } from "react-icons/fi";

import { setupAPIClient } from "../../services/api";

import { ModalOrder } from "../../components/ModalOrder";
import { ModalOrderCreate } from "../../components/ModalCreateOrder";

import Modal from "react-modal";

// Define OrderProps type
type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

// Define HomeProps interface
interface HomeProps {
  orders: OrderProps[];
}

// Define OrderItemProps type
export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

// Dashboard component
export default function Dashboard({ orders }: HomeProps) {
  // Manage order list state
  const [orderList, setOrderList] = useState(orders || []);

  // Manage modal item state
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();

  // Manage modal visibility state
  const [modalVisible, setModalVisible] = useState(false); //Main modal

  // Manage modal create visibility state
  const [modalCreateVisible, setModalCreateVisible] = useState(false); //Create modal

  //---------------------------------------------------------------

  // Handle modal close
  function handleCloseModal() {
    setModalVisible(false);
  }

  //--------------------------------------------------------------

  // Handle modal create open
  function handleOpenModalCreate() {
    setModalVisible(true);
  }

  //--------------------------------------------------------------

  // Handle creating a new order
  async function handleNewOrder() {
    // Setup API client
    const apiClient = setupAPIClient();

    // Create new order request
    const response = await apiClient.post("/order/add", {
      table: 1, // Replace with the desired table number
      status: false,
      draft: false,
      name: null, // Replace with the desired order name or null
    });

    // Extract new order data from response
    const newOrder = response.data;

    // Update order list with the new order
    setOrderList((prevOrderList) => [...prevOrderList, newOrder]);
  }

  //--------------------------------------------------------------

  // Handle opening modal to view order details
  async function handleOpenModalView(id: string) {
    // Setup API client
    const apiClient = setupAPIClient();

    // Fetch order details from API
    const response = await apiClient.get("/order/detail", {
      params: {
        order_id: id,
      },
    });

    // Extract order details from response
    const orderItem = response.data;

    // Update modal item state with order details
    setModalItem(orderItem);
    // Set modal visibility to true
    setModalVisible(true);
  }

  //--------------------------------------------------------------

  // Handle finishing an order item
  async function handleFinishItem(id: string) {
    // Setup API client
    const apiClient = setupAPIClient();

    // Send order completion request
    await apiClient.put("/order/finish", {
      order_id: id,
    });

    // Fetch updated order list from API
    const response = await apiClient.get("/orders");

    // Update order list with the updated data
    setOrderList(response.data);

    // Hide modal
    setModalVisible(false);
  }

  //------------------------------------------------------------

  // Handle refreshing order list
  async function handleRefreshOrders() {
    // Setup API client
    const apiClient = setupAPIClient();

    // Fetch updated order list from API
    const response = await apiClient.get("/orders");

    // Update order list with the updated data
    setOrderList(response.data);
  }

  // Set Modal app element
  Modal.setAppElement("#__next");

  //---------------------------------------
  // Render the Dashboard component
  //---------------------------------------
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>

      <div>
        {/* Render the Header component */}
        <Header />

        {/* Main content area */}
        <main className={styles.container}>
          {/* Header section with title, refresh button, and create order button */}
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>

            {/* Refresh button */}
            <button>
              <FiRefreshCcw size={28} color="#3fffa3" />
            </button>

            {/* Create order button */}
            <button onClick={handleOpenModalCreate}>
              <FiPlusSquare size={30} color="#3fffa4" />
            </button>

            {/* Check if the create order modal is visible */}
            {modalCreateVisible}
          </div>

          {/* List of orders */}
          <article className={styles.listOreders}>
            {/* Check if there are no orders */}
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado...
              </span>
            )}

            {/* Render each order item */}
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                {/* Order item button to open order details modal */}
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>

                {/* Edit order button */}
                <button>
                  <FiEdit3 />
                </button>

                {/* Remove order button */}
                <button>
                  <FiXCircle />
                </button>
              </section>
            ))}
          </article>
        </main>

        {/* Order details modal */}
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}
      </div>
    </>
  );
}

//---------------------------------------
// Server-side rendering
//---------------------------------------
export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  // Fetch orders from the API
  const response = await apiClient.get("/orders");

  //console.log(response.data);

  return {
    props: {
      orders: response.data,
    },
  };
});
