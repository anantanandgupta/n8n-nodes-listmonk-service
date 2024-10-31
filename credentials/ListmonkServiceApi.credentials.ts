import { IAuthenticate, IconFile, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

const icon: IconFile = 'file:ListmonkService.icon.svg'

export class ListmonkServiceApi implements ICredentialType {
  name = 'listmonkServiceApi';
  icon = {
    dark: icon,
    light: icon,
  };
  displayName = 'Listmonk Service API';
  documentationUrl: string = 'https://listmonk.app/docs/apis/apis/';
  authenticate: IAuthenticate = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{ $credentials["username"] }}',
        password: '={{ $credentials["password"] }}'
      }
    }
  };
  test?: ICredentialTestRequest = {
    request: {
      baseURL: '={{ $credentials["host"] }}',
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
