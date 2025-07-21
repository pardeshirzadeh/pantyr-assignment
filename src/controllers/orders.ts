import { Request, Response } from 'express';
import db from '../data/connection';

export const putOrders = (req: Request, res: Response) => {
	var products = req.body.products;
	console.log(products.length);

	var stmt = db.prepare('INSERT INTO Orders(id, orderedBy) VALUES(?, ?)');

	stmt.run(req.body.id, req.body.orderedBy);

	stmt = db.prepare('INSERT INTO ProductOrder(product, orders) VALUES(?, ?)');
	
	var i: any;
	for(i in products) {
		console.log(products[i]);
		stmt.run(products[i], req.body.id);
	}
	return res.send("done");
}
