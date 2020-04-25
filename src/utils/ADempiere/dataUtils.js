
export const OPERATOR_EQUAL = {
  operator: 'EQUAL',
  symbol: '='
}

export const OPERATOR_NOT_EQUAL = {
  operator: 'NOT_EQUAL',
  symbol: '<>'
}

export const OPERATOR_LIKE = {
  operator: 'LIKE',
  symbol: '%'
}

export const OPERATOR_NOT_LIKE = {
  operator: 'LIKE',
  symbol: '!%'
}

export const OPERATOR_GREATER = {
  operator: 'GREATER',
  symbol: '>'
}

export const OPERATOR_GREATER_EQUAL = {
  operator: 'GREATER_EQUAL',
  symbol: '>='
}

export const OPERATOR_LESS = {
  operator: 'LESS',
  symbol: '<'
}

export const OPERATOR_LESS_EQUAL = {
  operator: 'LESS_EQUAL',
  symbol: '<='
}

export const OPERATOR_BETWEEN = {
  operator: 'BETWEEN',
  symbol: '>-<'
}

export const OPERATOR_NOT_NULL = {
  operator: 'NOT_NULL',
  symbol: ''
}

export const OPERATOR_NULL = {
  operator: 'NULL',
  symbol: ''
}

export const OPERATOR_IN = {
  operator: 'IN',
  symbol: '()'
}

export const OPERATOR_NOT_IN = {
  operator: 'NOT_IN',
  symbol: '!()'
}

export const OPERATORS = [
  OPERATOR_EQUAL,
  OPERATOR_NOT_EQUAL,
  OPERATOR_LIKE,
  OPERATOR_NOT_LIKE,
  OPERATOR_GREATER,
  OPERATOR_LESS,
  OPERATOR_LESS_EQUAL,
  OPERATOR_BETWEEN,
  OPERATOR_NOT_NULL,
  OPERATOR_NULL,
  OPERATOR_IN,
  OPERATOR_NOT_IN
]

// Components associated with search type
export const FIELD_OPERATORS_LIST = [
  {
    type: 'FieldAmount',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_GREATER.operator,
      OPERATOR_GREATER_EQUAL.operator,
      OPERATOR_LESS.operator,
      OPERATOR_LESS_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldBinary',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldButton',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldDate',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_GREATER.operator,
      OPERATOR_GREATER_EQUAL.operator,
      OPERATOR_LESS.operator,
      OPERATOR_LESS_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldImage',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldNumber',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_GREATER.operator,
      OPERATOR_GREATER_EQUAL.operator,
      OPERATOR_LESS.operator,
      OPERATOR_LESS_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldSelect',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldText',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_LIKE.operator,
      OPERATOR_NOT_LIKE.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldTextLong',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_LIKE.operator,
      OPERATOR_NOT_LIKE.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldTime',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_GREATER.operator,
      OPERATOR_GREATER_EQUAL.operator,
      OPERATOR_LESS.operator,
      OPERATOR_LESS_EQUAL.operator,
      OPERATOR_IN.operator,
      OPERATOR_NOT_IN.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  },
  {
    type: 'FieldYesNo',
    isRange: false,
    conditionsList: [
      OPERATOR_EQUAL.operator,
      OPERATOR_NOT_EQUAL.operator,
      OPERATOR_NULL.operator,
      OPERATOR_NOT_NULL.operator
    ]
  }
]
