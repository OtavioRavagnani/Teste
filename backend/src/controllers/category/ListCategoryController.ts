import { Request, Response } from "express";
import { ListCategoryServyce } from "../../services/category/ListCategoryService";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListCategoryServyce();

    const category = await listCategoryService.execute();

    return res.json(category);
  }
}

export { ListCategoryController };
