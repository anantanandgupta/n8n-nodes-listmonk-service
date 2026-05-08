import { IDisplayOptions, INodeProperties } from "n8n-workflow";
import { mergeDisplayOptions } from "../../helpers/utils";

const operationParameters: INodeProperties[] = [
  {
    displayName: 'Use Pagination',
    description: 'Whether to paginate results',
    name: 'usePagination',
    type: 'boolean',
    default: false,
  },
  {
    displayName: 'Page',
    description: 'Page number to fetch',
    name: 'page',
    type: 'number',
    default: 1,
    displayOptions: {
      show: {
        usePagination: [true],
      },
    },
  },
  {
    displayName: 'Per Page',
    description: 'Number of results to return per page',
    name: 'perPage',
    type: 'number',
    default: 20,
    displayOptions: {
      show: {
        usePagination: [true],
      },
    },
  },
];

export const getPaginationOptions = (displayOptions: IDisplayOptions) => {
  return operationParameters.map((prop) => {
    // optional: avoid injecting displayOptions into props that don't have it
    if (!prop.displayOptions && !displayOptions) {
      return prop;
    }

    const merged = mergeDisplayOptions(prop.displayOptions, displayOptions);

    return {
      ...prop,
      ...(merged ? { displayOptions: merged } : {}),
    };
  });
};
