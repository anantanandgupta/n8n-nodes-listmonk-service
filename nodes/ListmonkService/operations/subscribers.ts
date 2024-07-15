import { INodeProperties } from "n8n-workflow";
import { resourceKeys } from "../resources";

const operations = {
  subscriber_create: 'subscriber_create',
  subscriber_get: 'subscriber_get',
  subscriber_delete: 'subscriber_delete',
  subscriber_get_all: 'subscriber_get_all',
  subscriber_update: 'subscriber_update',
} as const;

const operationParameters: INodeProperties[] = [
  {
    displayName: 'Subscriber Name',
    description: 'Name of the subscriber',
    name: 'subscriberName',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers],
      },
    },
  },
  {
    displayName: 'Subscriber Email',
    description: 'Email of the subscriber',
    name: 'subscriberEmail',
    required: true,
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers],
      },
    },
  },
  {
    displayName: 'Subscriber Status',
    description: 'Status of the subscriber',
    name: 'subscriberStatus',
    type: 'options',
    options: [
      {
        name: 'Enabled',
        value: 'enabled',
      },
      {
        name: 'Blocklisted',
        value: 'blocklisted',
      },
    ],
    default: 'enabled',
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers],
      },
    },
  },
  {
    displayName: 'Add to Subscription Lists',
    description: 'Whether the subscriber should be added to given lists',
    name: 'subscriberAddToLists',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers]
      },
    },
  },
  {
    displayName: 'Lists',
    description: 'IDs of the lists to add the subscriber to',
    name: 'subscriberLists',
    type: 'json',
    default: '[]',
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers],
        subscriberAddToLists: [true],
      },
    },
  },
  {
    displayName: 'Provide Additional Information',
    description: 'Whether the subscriber should store additional information',
    name: 'subscriberAdditionalInformation',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers]
      },
    },
  },
  {
    displayName: 'Additional Attributes',
    description: 'Optional data in JSON format',
    name: 'subscriberAttributes',
    type: 'json',
    default: '{}',
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers],
        subscriberAdditionalInformation: [true],
      },
    },
  },
  {
    displayName: 'Pre-Confirm Subscription',
    description: 'Whether subscriptions are marked as confirmed and no-opt-in emails are sent for double opt-in lists',
    name: 'subscriberPreConfirmSubscription',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        operation: [operations.subscriber_create, operations.subscriber_update],
        resource: [resourceKeys.subscribers]
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
        resource: [resourceKeys.subscribers],
      },
    },
    options: [
      {
        name: 'Create',
        value: operations.subscriber_create,
        action: 'Create a subscriber',
        routing: {
          request: {
            method: 'POST',
            url: '/subscribers',
            body: {
              email: '={{ $parameter["subscriberEmail"] }}',
              name: '={{ $parameter["subscriberName"] }}',
              status: '={{ $parameter["subscriberStatus"] }}',
              lists: '={{ $parameter["subscriberAddToLists"] === true ? JSON.parse($parameter["subscriberLists"]) : undefined }}',
              attribs: '={{ $parameter["subscriberAdditionalInformation"] === true ? JSON.parse($parameter["subscriberAttributes"]) : undefined }}',
              preconfirm_subscriptions: '={{ $parameter["subscriberPreConfirmSubscription"] }}',
            },
            encoding: 'json',
            json: true,
          }
        },
      }
    ],
    default: 'subscriber_create'
  },
  ...operationParameters,
];

export const subscriberOperationOptions = operationOptions;