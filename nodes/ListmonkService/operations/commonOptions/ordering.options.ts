import { IDisplayOptions, INodeProperties } from "n8n-workflow";
import { mergeDisplayOptions } from "../../helpers/utils";

const operationParameters: INodeProperties[] = [
  {
    displayName: 'Use Sorting',
    description: 'Whether to sort results',
    name: 'useSorting',
    type: 'boolean',
    default: false,
  },
  {
    displayName: 'Sort by Field',
    description: 'Select a field to sort the result by',
    name: 'sortField',
    type: 'options',
    options: [
      {
        name: 'Name',
        value: 'name',
      },
      {
        name: 'Status',
        value: 'status',
      },
      {
        name: 'Created At',
        value: 'created_at',
      },
      {
        name: 'Updated At',
        value: 'updated_at',
      },
    ],
    default: 'name',
    displayOptions: {
      show: {
        useSorting: [true],
      },
    },
  },
  {
    displayName: 'Sort Direction',
    description: 'Select the sort direction',
    name: 'sortDirection',
    type: 'options',
    options: [
      {
        name: 'Ascending',
        value: 'asc',
      },
      {
        name: 'Descending',
        value: 'desc',
      },
    ],
    default: 'asc',
    displayOptions: {
      show: {
        useSorting: [true],
      },
    },
  },
];

export const getSortingOptions = (displayOptions: IDisplayOptions) => {
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
