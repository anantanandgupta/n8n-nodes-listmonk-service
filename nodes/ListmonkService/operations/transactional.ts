import { INodeProperties } from "n8n-workflow";
import { resourceKeys } from "../resources";

const operations = {
  transactional_send: 'transactional_send',
} as const;

const operationParameters: INodeProperties[] = [
  {
    displayName: 'Template ID',
    description: 'ID of the template to use for sending the email',
    name: 'messageTemplateID',
    required: true,
    type: 'number',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
    },
  },
  {
    displayName: 'Sender Email',
    description: 'Sender email configured in listmonk',
    name: 'messageSenderEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
    },
  },
  {
    displayName: 'Use Messenger',
    description: 'Name of the messenger to use to send the email',
    name: 'messageMessenger',
    required: true,
    type: 'string',
    default: 'email',
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
    },
  },
  {
    displayName: 'Content Type',
    description: 'Type of the list to be created',
    name: 'messageContentType',
    type: 'options',
    default: 'html',
    options: [
      {
        name: 'HTML',
        value: 'html',
      },
      {
        name: 'Markdown',
        value: 'markdown',
      },
      {
        name: 'Plain',
        value: 'plain',
      },
    ],
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
    },
  },
  {
    displayName: 'Data',
    description: 'Optional data in JSON format',
    name: 'messageData',
    type: 'json',
    default: '{}',
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
    },
  },
  {
    displayName: 'Subscriber Identifier',
    description: 'Choose how to identify the subscriber',
    name: 'messageSubscriberIdentifier',
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
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
    },
  },
  {
    displayName: 'Subscriber ID',
    description: 'ID of the subscriber to send mail to',
    name: 'messageSubscriberID',
    type: 'number',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
      hide: {
        messageSubscriberIdentifier: ['subscriber_email']
      }
    },
  },
  {
    displayName: 'Subscriber Email',
    description: 'Email of the subscriber to send mail to',
    name: 'messageSubscriberEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: [operations.transactional_send],
        resource: [resourceKeys.transactional]
      },
      hide: {
        messageSubscriberIdentifier: ['subscriber_id']
      }
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
        resource: [resourceKeys.transactional],
      },
    },
    options: [
      {
        name: 'Send',
        value: operations.transactional_send,
        action: 'Send a transactional email',
        routing: {
          request: {
            method: 'POST',
            url: '/tx',
            body: {
              template_id: '={{ $parameter["messageTemplateID"] }}',
              subscriber_id: '={{ $parameter["messageSubscriberIdentifier"] === "subscriber_id" ? $parameter["messageSubscriberID"] : undefined }}',
              subscriber_email: '={{ $parameter["messageSubscriberIdentifier"] === "subscriber_email" ? $parameter["messageSubscriberEmail"] : undefined }}',
              from_email: '={{ $parameter["messageSenderEmail"] }}',
              messenger: '={{ $parameter["messageMessenger"] }}',
              content_type: '={{ $parameter["messageContentType"] }}',
              data: '={{ JSON.parse($parameter["messageData"]) }}',
            },
            encoding: 'json',
            json: true,
          }
        },
      },
    ],
    default: 'transactional_send'
  },
  ...operationParameters,
];

export const transactionalOperationOptions = operationOptions;