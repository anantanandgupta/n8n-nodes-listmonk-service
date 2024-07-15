import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from "n8n-workflow";
import { resourceKeys } from "../resources";

const operations = {
  list_create: 'list_create',
  list_get: 'list_get',
  list_delete: 'list_delete',
  list_get_all: 'list_get_all',
  list_update: 'list_update',
} as const;

const operationParameters: INodeProperties[] = [
  {
    displayName: 'List Name',
    description: 'Name of the new list to be created',
    name: 'listName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.list_create, operations.list_update],
        resource: [resourceKeys.lists],
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
        operation: [operations.list_create, operations.list_update],
        resource: [resourceKeys.lists],
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
    default: { 'listTag': '' },
    displayOptions: {
      show: {
        operation: [operations.list_create, operations.list_update],
        resource: [resourceKeys.lists],
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
        operation: [operations.list_create, operations.list_update],
        resource: [resourceKeys.lists],
      },
    },
  },
  {
    displayName: 'List ID',
    description: 'ID of the list',
    name: 'listID',
    type: 'number',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.list_delete, operations.list_get, operations.list_update],
        resource: [resourceKeys.lists],
      },
    },
  },
]

const operationOptions: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [resourceKeys.lists],
      },
    },
    options: [
      {
        name: 'Create',
        value: operations.list_create,
        action: 'Create a list',
        routing: {
          send: {
            preSend: [async function (
              this: IExecuteSingleFunctions,
              requestOptions: IHttpRequestOptions,
            ): Promise<IHttpRequestOptions> {
              const tags = this.getNodeParameter('listTags') as Array<{ listTag: string }>;
              const tagList = tags.map(tag => tag.listTag);
              requestOptions.body.tags = tagList;
              return requestOptions;
            }]
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
          }
        },
      },
      {
        name: 'Get by ID',
        value: operations.list_get,
        action: 'Get a list',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists/{{ $parameter["listID"] }}',
          },
        },
      },
      {
        name: 'Get All',
        value: operations.list_get_all,
        action: 'Get all lists',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists',
          },
        },
      },
      {
        name: 'Update',
        value: 'list_update',
        action: 'Update a list',
        routing: {
          request: {
            method: 'PUT',
            url: '=/lists/{{$parameter.listID}}',
            body: {
              name: '={{ $parameter["listName"] }}',
              type: '={{ $parameter["listType"] }}',
            },
            encoding: 'json',
            json: true,
          },
        },
      },
      {
        name: 'Delete',
        value: operations.list_delete,
        action: 'Delete a list',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/lists/{{ $parameter["listID"] }}',
          },
        },
      },
    ],
    default: 'list_create'
  },
  ...operationParameters,
];

export const listOperationOptions = operationOptions;