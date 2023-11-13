import prismaClient from "../../prisma";

class ListOrderService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      where: {
        status: false,
        draft: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return orders;
  }
}

export { ListOrderService };
