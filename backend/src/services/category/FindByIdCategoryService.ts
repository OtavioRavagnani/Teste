import prismaClient from "../../prisma";

class FindByIdCategoryService {
  async execute(id: string) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { FindByIdCategoryService };
