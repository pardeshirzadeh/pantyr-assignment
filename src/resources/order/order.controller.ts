import { Router, Request, Response, NextFunction } from "express";
import IConteroller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exceptions";
import validationMiddleware from "../../middleware/validation.middleware";
import OrderService from "./order.service";
import validate from "./order.validation";
import { IOrder } from "./order.interface";





class OrderController implements IConteroller {
    public path = '/orders';
    public router = Router();
    private Orderservice = new OrderService()

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router
            .post(
                `${this.path}`,
                validationMiddleware(validate.createOrderSchema),
                this.createOrderHandler
            ).get(
                `${this.path}`,
                this.retrieveAllOrderHandler
            ).get(
                `${this.path}/:id`,
                this.retrieveOrderHandler
            )

    }
    private createOrderHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const order = await this.Orderservice.create(req.body);
            res.status(201).json({ order });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
    private retrieveOrderHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const result = await this.Orderservice.findById(Number(req.params.id));
            res.status(200).json({ result });
        } catch (error: any) {
            next(new HttpException(404, error.message));
        }
    }

    private retrieveAllOrderHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const page = Number(req.query.page as string) || 1;
            const limit = Number(req.query.limit as string) || 3;
            const orders = await this.Orderservice.findAll(page, limit);

            const result = orders;
            res.status(200).json({ result });


        } catch (error: any) {
            next(new HttpException(404, error.message));
        }
    }
}

export default OrderController;