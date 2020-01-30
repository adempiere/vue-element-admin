
export const OPERATORS = [
  {
    operator: 'EQUAL',
    name: 'Equal to',
    symbol: '='
  },
  {
    operator: 'NOT_EQUAL',
    name: 'Not equal to',
    symbol: '<>'
  },
  {
    operator: 'LIKE',
    name: 'Like',
    symbol: '%'
  },
  {
    operator: 'NOT_LIKE',
    name: 'Not like',
    symbol: '!%'
  },
  {
    operator: 'GREATER',
    name: 'Greater than.',
    symbol: '>'
  },
  {
    operator: 'GREATER_EQUAL',
    name: 'Greater than equal to.',
    symbol: '>='
  },
  {
    operator: 'LESS',
    name: 'Less than.',
    symbol: '<'
  },
  {
    operator: 'LESS_EQUAL',
    name: 'Less than equal to.',
    symbol: '<='
  },
  {
    operator: 'BETWEEN',
    name: 'BETWEEN',
    symbol: ''
  },
  {
    operator: 'NOT_NULL',
    name: 'Non-NULL',
    symbol: ''
  },
  {
    operator: 'NULL',
    name: 'Is NULL',
    symbol: ''
  },
  {
    operator: 'IN',
    name: 'In',
    symbol: '()'
  },
  {
    operator: 'NOT_IN',
    name: 'Not in',
    symbol: '!()'
  }
]

// Components associated with search type
export const FIELD_OPERATORS_LIST = [
  {
    type: 'FieldBinary',
    isRange: false,
    description: 'Binary Data',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'NULL', 'NOT_NULL']
  },
  {
    id: 28,
    type: 'FieldButton',
    isRange: false,
    description: 'Command Button - starts a process',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'NULL', 'NOT_NULL']
  },
  {
    id: 15,
    type: 'FieldDate',
    isRange: false,
    description: 'Date mm/dd/yyyy',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'GREATER', 'GREATER_EQUAL', 'LESS', 'LESS_EQUAL', 'NULL', 'NOT_NULL']
  },
  {
    id: 32,
    type: 'FieldImage',
    isRange: false,
    description: 'Binary Image Data',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'NULL', 'NOT_NULL']
  },
  {
    id: 12,
    type: 'FieldNumber',
    isRange: false,
    description: 'Number with 4 decimals',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'GREATER', 'GREATER_EQUAL', 'LESS', 'LESS_EQUAL', 'NULL', 'NOT_NULL']
  },
  {
    id: 17,
    type: 'FieldSelect',
    isRange: false,
    description: 'Reference List',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'IN', 'NOT_IN', 'NULL', 'NOT_NULL']
  },
  {
    id: 34,
    type: 'FieldText',
    isRange: false,
    description: 'Reference List',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'LIKE', 'NOT_LIKE', 'NULL', 'NOT_NULL']
  },
  {
    id: 36,
    type: 'FieldTextLong',
    isRange: false,
    description: 'Text (Long) - Text > 2000 characters',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'LIKE', 'NOT_LIKE', 'NULL', 'NOT_NULL']
  },
  {
    id: 24,
    type: 'FieldTime',
    isRange: false,
    description: 'Time',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'GREATER', 'GREATER_EQUAL', 'LESS', 'LESS_EQUAL', 'NULL', 'NOT_NULL']
  },
  {
    id: 20,
    type: 'FieldYesNo',
    isRange: false,
    description: 'CheckBox',
    conditionsList: ['EQUAL', 'NOT_EQUAL', 'NULL', 'NOT_NULL']
  }
]
