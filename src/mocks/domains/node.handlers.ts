import { rest } from 'msw';

import { NodeEntity, umbNodeData } from '../data/node.data';

// TODO: add schema
export const handlers = [
	rest.get('/umbraco/backoffice/node/:key', (req, res, ctx) => {
		console.warn('Please move to schema');
		const key = req.params.key as string;
		if (!key) return;

		const document = umbNodeData.getByKey(key);

		return res(ctx.status(200), ctx.json([document]));
	}),

	rest.post<NodeEntity[]>('/umbraco/backoffice/node/save', (req, res, ctx) => {
		console.warn('Please move to schema');
		const data = req.body;
		if (!data) return;

		const saved = umbNodeData.save(data);

		return res(ctx.status(200), ctx.json(saved));
	}),

	rest.post<NodeEntity[]>('/umbraco/backoffice/node/trash', (req, res, ctx) => {
		console.warn('Please move to schema');
		const key = req.body as string;

		const trashed = umbNodeData.trash(key);

		return res(ctx.status(200), ctx.json([trashed]));
	}),
];
