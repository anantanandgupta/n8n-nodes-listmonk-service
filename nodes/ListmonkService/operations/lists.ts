import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { resourceKeys } from '../resources';

const operations = {
	list_create: { key: 'list_create', label: 'Create' },
	list_get: { key: 'list_get', label: 'Get by ID' },
	list_delete: { key: 'list_delete', label: 'Delete' },
	list_get_all: { key: 'list_get_all', label: 'Get All' },
	list_update: { key: 'list_update', label: 'Update' },
} as const;

const operationParameters: INodeProperties[] = [
	{
		displayName: 'List ID',
		description: 'ID of the list',
		name: 'listID',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.list_delete.key, operations.list_get.key, operations.list_update.key],
				resource: [resourceKeys.lists.key],
			},
		},
	},
	{
		displayName: 'List Name',
		description: 'Name of the new list to be created',
		name: 'listName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.list_create.key, operations.list_update.key],
				resource: [resourceKeys.lists.key],
			},
		},
	},
	{
		displayName: 'List OptIn',
		description: 'Subscriber opt-in setting for the list',
		name: 'listOptIn',
		type: 'options',
		options: [
			{
				name: 'Single',
				value: 'single',
			},
			{
				name: 'Double',
				value: 'double',
			},
		],
		default: 'single',
		displayOptions: {
			show: {
				operation: [operations.list_create.key, operations.list_update.key],
				resource: [resourceKeys.lists.key],
			},
		},
	},
	{
		displayName: 'List Tags',
		description: 'Tags to be assigned to list',
		name: 'listTags',
		type: 'collection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Tag',
		},
		default: { listTag: '' },
		displayOptions: {
			show: {
				operation: [operations.list_create.key, operations.list_update.key],
				resource: [resourceKeys.lists.key],
			},
		},
		options: [
			{
				displayName: 'Tag',
				name: 'listTag', // key to use in translation
				type: 'string',
				default: '',
				description: 'Tag to be added to list',
			},
		],
	},
	{
		displayName: 'List Type',
		description: 'Type of the list to be created',
		name: 'listType',
		type: 'options',
		default: 'private',
		options: [
			{
				name: 'Private',
				value: 'private',
			},
			{
				name: 'Public',
				value: 'public',
			},
		],
		displayOptions: {
			show: {
				operation: [operations.list_create.key, operations.list_update.key],
				resource: [resourceKeys.lists.key],
			},
		},
	},
];

const operationOptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [resourceKeys.lists.key],
			},
		},
		options: [
			{
				name: operations.list_create.label,
				value: operations.list_create.key,
				action: 'Create a list',
				routing: {
					send: {
						preSend: [
							async function (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
								const tags = this.getNodeParameter('listTags') as Array<{ listTag: string }>;
								const tagList = tags.map((tag) => tag.listTag);
								requestOptions.body.tags = tagList;
								return requestOptions;
							},
						],
					},
					request: {
						method: 'POST',
						url: '/lists',
						body: {
							name: '={{ $parameter["listName"] }}',
							type: '={{ $parameter["listType"] }}',
							optin: '={{ $parameter["listOptIn"] }}',
						},
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: operations.list_get.label,
				value: operations.list_get.key,
				action: 'Get a list',
				routing: {
					request: {
						method: 'GET',
						url: '=/lists/{{ $parameter["listID"] }}',
					},
				},
			},
			{
				name: operations.list_get_all.label,
				value: operations.list_get_all.key,
				action: 'Get all lists',
				routing: {
					request: {
						method: 'GET',
						url: '=/lists',
					},
				},
			},
			{
				name: operations.list_update.label,
				value: operations.list_update.key,
				action: 'Update a list',
				routing: {
					send: {
						preSend: [
							async function (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
								const tags = this.getNodeParameter('listTags') as Array<{ listTag: string }>;
								const tagList = tags.map((tag) => tag.listTag);
								requestOptions.body.tags = tagList;

								this.logger.debug('Request Options:', requestOptions);

								return requestOptions;
							},
						],
					},
					request: {
						method: 'PUT',
						url: '=/lists/{{$parameter.listID}}',
						body: {
							name: '={{ $parameter["listName"] }}',
							type: '={{ $parameter["listType"] }}',
							optin: '={{ $parameter["listOptIn"] }}',
						},
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: operations.list_delete.label,
				value: operations.list_delete.key,
				action: 'Delete a list',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/lists/{{ $parameter["listID"] }}',
					},
				},
			},
		],
		default: 'list_create',
	},
	...operationParameters,
];

export const listOperationOptions = operationOptions;
