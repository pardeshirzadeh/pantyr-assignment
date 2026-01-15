import { Router, Request, Response, NextFunction } from "express";
import IConteroller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exceptions";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./product.validation";
import ProductService from "./product.service";





class ProductController implements IConteroller {
    public path = '/products';
    public router = Router();
    private productservice = new ProductService

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router
            .post(
                `${this.path}`,
                validationMiddleware(validate.createProductSchema),
                this.createProductHandler
            ).get(
                `${this.path}`,
                this.retrieveAllProductHandler
            ).get(
                `${this.path}/:id`,
                this.retrieveProductHandler
            )

    }
    private createProductHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const product = await this.productservice.create(req.body);

            res.status(201).json({ product });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
    private retrieveProductHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const product = await this.productservice.findById(Number(req.params.id));
            res.status(200).json({ product });

        } catch (error: any) {
            next(new HttpException(404, error.message));
        }
    }

    private retrieveAllProductHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const page = Number(req.query.page as string) || 1;
            const limit = Number(req.query.limit as string) || 3;
            const product = await this.productservice.findAll(page, limit);
            res.status(200).json({ product });
        } catch (error: any) {
            next(new HttpException(404, error.message));
        }
    }
}

export default ProductController;