import type { INodeProperties } from 'n8n-workflow';
export const resourceKeys = {
	lists: { key: 'lists', label: 'List' },
	subscribers: { key: 'subscribers', label: 'Subscriber' },
	transactional: { key: 'transactional', label: 'Transactional Message' },
} as const;

export const resourceOptions: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: resourceKeys.lists.label,
			value: resourceKeys.lists.key,
		},
		{
			name: resourceKeys.subscribers.label,
			value: resourceKeys.subscribers.key,
		},
		{
			name: resourceKeys.transactional.label,
			value: resourceKeys.transactional.key,
		},
	],
	default: 'subscribers',
};
