import { IAuthenticate, Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ListmonkAPIs implements ICredentialType {
  name: string = 'ListmonkAPIs';
  displayName: string = 'Listmonk APIs';
  documentationUrl: string = 'https://listmonk.app/docs/apis/apis/';
  icon: Icon = {
    dark: 'file:ListmonkAPIs.icon.svg',
    light: 'file:ListmonkAPIs.icon.svg',
  };
  authenticate: IAuthenticate = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{$credentials.username}}',
        password: '={{$credentials.password}}'
      }
    }
  };
  test?: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.host}}',
      url: '/admin',
      method: 'GET',
    },
  };
  properties: INodeProperties[] = [
    {
      displayName: 'Username',
      name: 'username',
      type: 'string',
      required: true,
      default: '',
    },
    {
      displayName: 'Password',
      name: 'password',
      type: 'string',
      typeOptions: {
        password: true,
      },
      required: true,
      default: ''
    },
    {
      displayName: 'Host',
      name: 'host',
      type: 'string',
      hint: 'prefix with protocol like http:// or https://',
      required: true,
      validateType: 'url',
      default: 'https://listmonk.example.com',
    },
  ];
}