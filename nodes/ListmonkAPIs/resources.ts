import type { INodeProperties } from 'n8n-workflow';
export const resourceKeys = {
	lists: 'lists',
	subscribers: 'subscribers',
	transactional: 'transactional',
} as const;

export const resourceOptions: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'List Operations',
			value: resourceKeys.lists,
		},
		{
			name: 'Subscriber Operations',
			value: resourceKeys.subscribers,
		},
		{
			name: 'Transactional Messages',
			value: resourceKeys.transactional,
		},
	],
	default: resourceKeys.subscribers,
};
