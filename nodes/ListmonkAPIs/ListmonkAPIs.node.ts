import { INodeType, INodeTypeDescription } from "n8n-workflow";
import { resourceOptions } from "./resources";
import { listOperationOptions, subscriberOperationOptions, transactionalOperationOptions } from "./operations";

export class ListmonkAPIs implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Listmonk APIs',
		name: 'ListmonkAPIs',
		icon: {
      dark: 'file:ListmonkAPIs.icon.svg',
      light: 'file:ListmonkAPIs.icon.svg',
    },
    group: ['transform'],
    version: [1],
    defaultVersion: 1,
    subtitle: '={{ $parameter["resource"] + " (" + $parameter["operation"] + ")" }}',
		description: 'Call listmonk api endpoints.',
    defaults: {
      name: 'Listmonk APIs',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'ListmonkAPIs',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{ $credentials.host.replace(new RegExp("/$"), "") + "/api" }}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    },
		properties: [
		  resourceOptions,
      ...subscriberOperationOptions,
      ...listOperationOptions,
      ...transactionalOperationOptions,
		]
	};
}