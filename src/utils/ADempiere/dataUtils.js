
const OPERATOR_EQUAL = {
  operator: 'EQUAL',
  symbol: '='
}

const OPERATOR_NOT_EQUAL = {
  operator: 'NOT_EQUAL',
  symbol: '<>'
}

const OPERATOR_LIKE = {
  operator: 'LIKE',
  symbol: '%'
}

const OPERATOR_NOT_LIKE = {
  operator: 'NOT_LIKE',
  symbol: '!%'
}

const OPERATOR_GREATER = {
  operator: 'GREATER',
  symbol: '>'
}

const OPERATOR_GREATER_EQUAL = {
  operator: 'GREATER_EQUAL',
  symbol: '>='
}

const OPERATOR_LESS = {
  operator: 'LESS',
  symbol: '<'
}

const OPERATOR_LESS_EQUAL = {
  operator: 'LESS_EQUAL',
  symbol: '<='
}

const OPERATOR_BETWEEN = {
  operator: 'BETWEEN',
  symbol: '>-<'
}

const OPERATOR_NULL = {
  operator: 'NULL',
  symbol: ''
}

const OPERATOR_NOT_NULL = {
  operator: 'NOT_NULL',
  symbol: ''
}

const OPERATOR_IN = {
  operator: 'IN',
  symbol: '()'
}

const OPERATOR_NOT_IN = {
  operator: 'NOT_IN',
  symbol: '!()'
}

const STANDARD_OPERATORS_LIST = [
  OPERATOR_EQUAL.operator,
  OPERATOR_NOT_EQUAL.operator,
  OPERATOR_NULL.operator,
  OPERATOR_NOT_NULL.operator
]

const MULTIPLE_OPERATORS_LIST = [
  OPERATOR_IN.operator,
  OPERATOR_NOT_IN.operator
]

const TEXT_OPERATORS_LIST = [
  OPERATOR_LIKE.operator,
  OPERATOR_NOT_LIKE.operator
]

const RANGE_OPERATORS_LIST = [
  OPERATOR_GREATER.operator,
  OPERATOR_GREATER_EQUAL.operator,
  OPERATOR_LESS.operator,
  OPERATOR_LESS_EQUAL.operator
]

export const OPERATORS_LIST = [
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

export const OPERATORS_FIELD_AMOUNT = {
  type: 'FieldAmount',
  isRange: true,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...RANGE_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_DATE = {
  type: 'FieldDate',
  isRange: true,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...RANGE_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_NUMBER = {
  type: 'FieldNumber',
  isRange: true,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...RANGE_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_SELECT = {
  type: 'FieldSelect',
  isRange: false,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_TEXT = {
  type: 'FieldText',
  isRange: false,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...TEXT_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_TEXT_LONG = {
  type: 'FieldTextLong',
  isRange: false,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...TEXT_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_TIME = {
  type: 'FieldTime',
  isRange: true,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST,
    ...RANGE_OPERATORS_LIST,
    ...MULTIPLE_OPERATORS_LIST
  ]
}

export const OPERATORS_FIELD_YES_NO = {
  type: 'FieldYesNo',
  isRange: false,
  operatorsList: [
    ...STANDARD_OPERATORS_LIST
  ]
}

// Components associated with search type
export const FIELD_OPERATORS_LIST = [
  OPERATORS_FIELD_AMOUNT,
  OPERATORS_FIELD_DATE,
  OPERATORS_FIELD_NUMBER,
  OPERATORS_FIELD_SELECT,
  OPERATORS_FIELD_TEXT,
  OPERATORS_FIELD_TEXT_LONG,
  OPERATORS_FIELD_TEXT_LONG,
  OPERATORS_FIELD_TIME,
  OPERATORS_FIELD_YES_NO
]
