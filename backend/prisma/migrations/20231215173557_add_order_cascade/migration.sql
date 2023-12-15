-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_order_id_fkey";

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
