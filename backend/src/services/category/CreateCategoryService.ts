import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === "") {
      throw new Error("Name Invalid");
    }

    const exist = await prismaClient.category.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (exist) {
      throw new Error(`Name ${name} already exists`);
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
