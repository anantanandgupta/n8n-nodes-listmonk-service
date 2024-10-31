import { IconFile, INodeType, INodeTypeDescription } from "n8n-workflow";
import { resourceOptions } from "./resources";
import { listOperationOptions, subscriberOperationOptions, transactionalOperationOptions } from "./operations";

const icon: IconFile = 'file:ListmonkService.icon.svg'

export class ListmonkService implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Listmonk Service',
    name: 'listmonkService',
    icon: {
      dark: icon,
      light: icon,
    },
    group: ['transform'],
    version: [1],
    defaultVersion: 1,
    subtitle: '={{ $parameter["resource"] + " (" + $parameter["operation"] + ")" }}',
    description: 'Call listmonk service endpoints.',
    defaults: {
      name: 'Listmonk Service',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'listmonkServiceApi',
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
