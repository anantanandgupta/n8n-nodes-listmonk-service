import { INodeProperties } from 'n8n-workflow';
import { resourceKeys } from '../resources';

const operations = {
	send: { key: 'send', label: 'Send' },
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
			},
		},
	},
	{
		displayName: 'Is Subscriber Existing?',
		description: 'Tell listmonk to make sure that the subscriber exists',
		name: 'messageIsSubscriberExisting',
		type: 'options',
		required: true,
		default: 'subscriber_existing',
		options: [
			{
				name: 'Existing Subscriber',
				value: 'subscriber_existing',
			},
			{
				name: 'Not a Subscriber',
				value: 'subscriber_not_existing',
				displayOptions: {
					hide: {
						'@version': [1],
					},
				},
			},
		],
		displayOptions: {
			show: {
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
			},
		},
	},
	{
		displayName: 'Recepient Email',
		description: 'Email of the subscriber to send mail to',
		name: 'messageSubscriberEmails',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
			},
			hide: {
				messageIsSubscriberExisting: ['subscriber_existing'],
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
			},
			hide: {
				messageIsSubscriberExisting: ['subscriber_not_existing'],
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
				messageSubscriberIdentifier: ['subscriber_id'],
			},
			hide: {
				messageIsSubscriberExisting: ['subscriber_not_existing'],
			},
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
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
				messageSubscriberIdentifier: ['subscriber_email'],
			},
			hide: {
				messageIsSubscriberExisting: ['subscriber_not_existing'],
			},
		},
	},
	{
		displayName: 'Reply-To Address',
		description: 'Used when the recepeint replies to the email received',
		name: 'messageReplyToEmailAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.send.key],
				resource: [resourceKeys.transactional.key],
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
				resource: [resourceKeys.transactional.key],
			},
		},
		options: [
			{
				name: operations.send.label,
				value: operations.send.key,
				action: 'Send a transactional email',
				routing: {
					request: {
						method: 'POST',
						url: '/tx',
						body: {
							template_id: '={{ $parameter["messageTemplateID"] }}',
							subscriber_id:
								'={{ $parameter["messageIsSubscriberExisting"] === "subscriber_existing" && $parameter["messageSubscriberIdentifier"] === "subscriber_id" ? $parameter["messageSubscriberID"] : undefined }}',
							subscriber_email:
								'={{ $parameter["messageIsSubscriberExisting"] === "subscriber_existing" && $parameter["messageSubscriberIdentifier"] === "subscriber_email" ? $parameter["messageSubscriberEmail"] : undefined }}',
							subscriber_emails:
								'={{ $parameter["messageIsSubscriberExisting"] === "subscriber_not_existing" ? [$parameter["messageSubscriberEmails"]] : undefined }}',
							subscriber_mode:
								'={{ $parameter["messageIsSubscriberExisting"] === "subscriber_not_existing" ? "external" : undefined }}',
							from_email: '={{ $parameter["messageSenderEmail"] }}',
							messenger: '={{ $parameter["messageMessenger"] }}',
							content_type: '={{ $parameter["messageContentType"] }}',
							data: '={{ JSON.parse($parameter["messageData"]) }}',
							headers:
								'={{ $parameter["messageReplyToEmailAddress"]?.trim() ? [{ "Reply-To": $parameter["messageReplyToEmailAddress"]?.trim() }] : [] }}',
						},
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'send',
	},
	...operationParameters,
];

export const transactionalOperationOptions = operationOptions;
