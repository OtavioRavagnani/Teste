import _ from "lodash";
import prismaClient from "../../prisma";

interface CategoryRequest {
  id?: string;
  name: string;
}

class CreateCategoryService {
  async execute({ id, name }: CategoryRequest) {
    let category: any;
    if (name === "") {
      throw new Error("Name Invalid");
    }

    if (_.isNull(id) || _.isEmpty(id)) {
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
      category = await prismaClient.category.create({
        data: {
          name: name,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } else {
      category = await prismaClient.category.update({
        where: {
          id: id,
        },
        data: {
          id: id,
          name: name,
        },
        select: {
          id: true,
          name: true,
        },
      });
    }

    return category;
  }
}

export { CreateCategoryService };
