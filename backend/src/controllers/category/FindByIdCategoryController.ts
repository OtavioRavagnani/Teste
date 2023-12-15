import { Request, Response } from "express";
import { FindByIdCategoryService } from "../../services/category/FindByIdCategoryService";

class FindByIdCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.query;
    const findByCategoryService = new FindByIdCategoryService();

    const category = await findByCategoryService.execute(id as string);

    return res.json(category);
  }
}

export { FindByIdCategoryController };
