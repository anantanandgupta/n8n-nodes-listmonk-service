import { INodeProperties } from "n8n-workflow";
import { resourceKeys } from "../resources";

const operations = {
  subscriber_create: 'subscriber_create',
  subscriber_get: 'subscriber_get',
  subscriber_delete: 'subscriber_delete',
  subscriber_get_all: 'subscriber_get_all',
  subscriber_update: 'subscriber_update',
  subscriber_manage_list: 'subscriber_manage_list',
} as const;

const operationParameters: INodeProperties[] = [
  {
    displayName: 'Subscriber ID',
    description: 'ID of the subscriber',
    name: 'subscriberID',
    type: 'number',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.subscriber_update],
        resource: [resourceKeys.subscribers]
      },
      hide: {
        subscriberIdentifier: ['subscriber_email']
      }
    },
  },
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
        operation: [operations.subscriber_create],
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
        operation: [operations.subscriber_create],
        resource: [resourceKeys.subscribers],
        subscriberAddToLists: [true],
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
        operation: [operations.subscriber_update],
        resource: [resourceKeys.subscribers]
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
        operation: [operations.subscriber_create],
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
        operation: [operations.subscriber_create],
        resource: [resourceKeys.subscribers],
        subscriberAdditionalInformation: [true],
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
        operation: [operations.subscriber_update],
        resource: [resourceKeys.subscribers],
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
  {
    displayName: 'Subscriber Identifier',
    description: 'Choose how to identify the subscriber',
    name: 'subscriberIdentifier',
    type: 'options',
    required: true,
    default: 'subscriber_id',
    options: [
      {
        name: 'Subscriber ID',
        value: 'subscriber_id',
      },
      {
        name: 'Subscriber Email',
        value: 'subscriber_email',
      },
    ],
    displayOptions: {
      show: {
        operation: [operations.subscriber_get],
        resource: [resourceKeys.subscribers]
      },
    },
  },
  {
    displayName: 'Subscriber ID',
    description: 'ID of the subscriber',
    name: 'subscriberID',
    type: 'number',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.subscriber_get],
        resource: [resourceKeys.subscribers]
      },
      hide: {
        subscriberIdentifier: ['subscriber_email']
      }
    },
  },
  {
    displayName: 'Subscriber Email',
    description: 'Email of the subscriber',
    name: 'subscriberEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.subscriber_get],
        resource: [resourceKeys.subscribers]
      },
      hide: {
        subscriberIdentifier: ['subscriber_id']
      }
    },
  },
  {
    displayName: 'Subscriber IDs',
    description: 'IDs of the subscribers to add to list',
    name: 'subscriberIDs',
    type: 'json',
    default: '[]',
    displayOptions: {
      show: {
        operation: [operations.subscriber_manage_list],
        resource: [resourceKeys.subscribers]
      }
    },
  },
  {
    displayName: 'Action',
    name: 'subscriberAction',
    type: 'options',
    options: [
      {
        name: 'Add',
        value: 'add',
      },
      {
        name: 'Remove',
        value: 'remove',
      },
      {
        name: 'Unsubscribe',
        value: 'unsubscribe',
      },
    ],
    default: 'add',
    displayOptions: {
      show: {
        operation: [operations.subscriber_manage_list],
        resource: [resourceKeys.subscribers]
      }
    },
  },
  {
    displayName: 'List IDs',
    description: 'IDs of the lists to add subscribers to',
    name: 'listIDs',
    type: 'json',
    default: '[]',
    displayOptions: {
      show: {
        operation: [operations.subscriber_manage_list],
        resource: [resourceKeys.subscribers]
      }
    },
  },
  {
    displayName: 'Subscription Status',
    description: 'Select status of the subscriber when adding',
    name: 'subscriptionStatus',
    type: 'options',
    options: [
      {
        name: 'Confirmed',
        value: 'confirmed',
      },
      {
        name: 'Unconfirmed',
        value: 'unconfirmed',
      },
      {
        name: 'Unsubscribed',
        value: 'unsubscribed',
      },
    ],
    default: 'confirmed',
    displayOptions: {
      show: {
        operation: [operations.subscriber_manage_list],
        resource: [resourceKeys.subscribers],
        subscriberAction: ['add'],
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
      },
      {
        name: 'Get',
        value: operations.subscriber_get,
        action: 'Get subscriber',
        routing: {
          request: {
            method: 'GET',
            url: '={{ $parameter["subscriberIdentifier"] === "subscriber_id" ? "/subscribers/" + $parameter["subscriberID"] : "/subscribers" }}',
            qs: {
              query: '={{ $parameter["subscriberIdentifier"] === "subscriber_email" ? "email=\'" + $parameter["subscriberEmail"] + "\'" : undefined }}',
            },
          },
        },
      },
      {
        name: 'Manage Subscriber List',
        value: operations.subscriber_manage_list,
        action: 'Manage subscriber list',
        routing: {
          request: {
            method: 'PUT',
            url: '/subscribers/lists',
            body: {
              ids: '={{ JSON.parse($parameter["subscriberIDs"]) }}',
              action: '={{ $parameter["subscriberAction"] }}',
              target_list_ids: '={{ JSON.parse($parameter["listIDs"]) }}',
              status: '={{ $parameter["subscriptionStatus"] }}',
            },
            encoding: 'json',
            json: true,
          },
        },
      },
      {
        name: 'Update Subscriber',
        value: operations.subscriber_update,
        action: 'Update subscriber by id',
        routing: {
          request: {
            method: 'PUT',
            url: '={{ "/subscribers/" + $parameter["subscriberID"]}}',
            body: {
              email: '={{ $parameter["subscriberEmail"] }}',
              name: '={{ $parameter["subscriberName"] }}',
              status: '={{ $parameter["subscriberStatus"] }}',
              lists: '={{ JSON.parse($parameter["subscriberLists"]) }}',
              attribs: '={{ JSON.parse($parameter["subscriberAttributes"]) }}',
              preconfirm_subscriptions: '={{ $parameter["subscriberPreConfirmSubscription"] }}',

            },
            encoding: 'json',
            json: true,
          },
        },
      },
    ],
    default: 'subscriber_create'
  },
  ...operationParameters,
];

export const subscriberOperationOptions = operationOptions;
