import prismaClient from "../../prisma";

interface OrderReuest{
    order_id: string;
}

class RemoveOrderService{
    async execute({order_id}: OrderReuest){

        const order = await prismaClient.order.delete({
            where:{
                id: order_id
            }
        })

        return order;

    }
}

export { RemoveOrderService }