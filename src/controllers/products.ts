import { Request, Response } from 'express';
import db from '../data/connection';

export const getProducts = (req: Request, res: Response) => {
	const stmt = db.prepare('SELECT * FROM Product ORDER BY id limit 10 offset ?');

	let page = Number(req.query.page);
	const rows = stmt.all([10 * page]);

	return res.send(rows);
}

