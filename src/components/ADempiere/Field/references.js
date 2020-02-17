
/**
 * All references
 * {number} id: Identifiert to field reference
 * {string|array} valueType: to convert and send server with gRPC
 * {boolean} isSupported: Indicate if field is suported
 */
const REFERENCES = [
  {
    id: 25,
    type: 'FieldText',
    isSupported: false,
    description: 'Account Element',
    valueType: 'INTEGER',
    alias: ['Account']
  },
  {
    id: 12,
    type: 'FieldNumber',
    isSupported: true,
    description: 'Number with 4 decimals',
    valueType: 'DOUBLE',
    alias: ['Amount']
  },
  {
    id: 33,
    type: 'FieldText',
    isSupported: false,
    description: 'Resource Assignment',
    valueType: 'STRING',
    alias: ['Assignment']
  },
  {
    id: 23,
    type: 'FieldBinary',
    isSupported: true,
    description: 'Binary Data',
    valueType: 'NULL',
    alias: ['Binary']
  },
  {
    // this component is hidden
    id: 28,
    type: 'FieldButton',
    isSupported: true,
    description: 'Command Button - starts a process',
    valueType: 'NULL',
    alias: ['Button']
  },
  {
    id: 53370,
    type: 'FieldText',
    isSupported: false,
    description: 'Chart',
    valueType: 'STRING',
    alias: ['Chart']
  },
  {
    id: 27,
    type: 'FieldText',
    isSupported: false,
    description: 'Color element',
    valueType: 'STRING',
    alias: ['Color']
  },
  {
    id: 37,
    type: 'FieldNumber',
    isSupported: true,
    description: 'Costs + Prices (minimum currency precision but if exists more)',
    valueType: 'DOUBLE',
    alias: ['Costs+Prices', 'CostsPrices', 'Cost Prices']
  },
  {
    id: 15,
    type: 'FieldDate',
    isSupported: true,
    description: 'Date mm/dd/yyyy',
    valueType: 'DATE',
    alias: ['Date']
  },
  {
    id: 16,
    type: 'FieldDate',
    isSupported: true,
    description: 'Date with time',
    valueType: 'DATE',
    alias: ['DateTime', 'Date Time', 'Date+Time']
  },
  {
    id: 39,
    type: 'FieldText',
    isSupported: true,
    description: 'Local File',
    valueType: 'STRING',
    alias: ['FileName', 'File Name']
  },
  {
    id: 38,
    type: 'FieldText',
    isSupported: true,
    description: 'Local File Path',
    valueType: 'STRING',
    alias: ['FilePath', 'File Path']
  },
  {
    id: 53670,
    type: 'FieldText',
    isSupported: true,
    description: 'Local File Path or Name',
    valueType: 'STRING',
    alias: ['FilePathOrName', 'File Path Or Name']
  },
  {
    id: 13,
    type: 'FieldNumber',
    isSupported: true,
    description: '10 Digit Identifier',
    valueType: 'INTEGER',
    alias: ['ID']
  },
  {
    id: 32,
    type: 'FieldImage',
    isSupported: true,
    description: 'Binary Image Data',
    valueType: 'NULL',
    alias: ['Image']
  },
  {
    id: 11,
    type: 'FieldNumber',
    isSupported: true,
    description: '10 Digit numeric',
    valueType: 'INTEGER',
    alias: ['Integer']
  },
  {
    id: 17,
    type: 'FieldSelect',
    isSupported: true,
    description: 'Reference List',
    valueType: ['INTEGER', 'STRING'],
    alias: ['List']
  },
  {
    id: 21,
    type: 'FieldText',
    isSupported: false,
    description: 'Location/Address',
    valueType: 'STRING',
    alias: ['Location', 'Location (Address)', 'Location/Address']
  },
  {
    id: 31,
    type: 'FieldSelect',
    isSupported: true,
    description: 'Warehouse Locator Data type',
    valueType: 'INTEGER',
    alias: ['Locator', 'Locator (WH)', 'Locator/WH']
  },
  {
    id: 34,
    type: 'FieldTextLong',
    isSupported: true,
    valueType: 'STRING',
    description: 'Reference List',
    alias: ['Memo']
  },
  {
    id: 22,
    type: 'FieldNumber',
    isSupported: true,
    description: 'Float Number',
    valueType: 'DOUBLE',
    alias: ['Number']
  },
  {
    id: 42,
    type: 'FieldText',
    isSupported: true,
    description: 'Printer Name',
    valueType: 'STRING',
    alias: ['PrinterName', 'Printer Name']
  },
  {
    id: 35,
    type: 'FieldText',
    isSupported: false,
    description: 'Product Attribute',
    valueType: 'STRING',
    alias: ['ProductAttribute', 'Product Attribute']
  },
  {
    id: 29,
    type: 'FieldNumber',
    isSupported: true,
    description: 'Quantity data type',
    valueType: 'DOUBLE',
    alias: ['Quantity']
  },
  {
    id: 30,
    type: 'FieldSelect',
    isSupported: true,
    description: 'Search Field',
    valueType: ['INTEGER', 'STRING'],
    alias: ['Search']
  },
  {
    id: 10,
    type: 'FieldText',
    isSupported: true,
    description: 'Character String',
    valueType: 'STRING',
    alias: ['String']
  },
  {
    id: 18,
    type: 'FieldSelect',
    isSupported: true,
    description: 'Table List',
    valueType: 'INTEGER',
    alias: ['Table']
  },
  {
    id: 19,
    type: 'FieldSelect',
    isSupported: true,
    description: 'Direct Table Access',
    valueType: 'INTEGER',
    alias: ['TableDirect', 'Table Direct']
  },
  {
    id: 14,
    type: 'FieldText',
    isSupported: true,
    description: 'Character String up to 2000 characters',
    valueType: 'STRING',
    alias: ['Text']
  },
  {
    id: 36,
    type: 'FieldTextLong',
    isSupported: true,
    description: 'Text (Long) - Text > 2000 characters',
    valueType: 'STRING',
    alias: ['TextLong', 'Text Long']
  },
  {
    id: 24,
    type: 'FieldTime',
    isSupported: true,
    description: 'Time',
    valueType: 'DATE',
    alias: ['Time']
  },
  {
    id: 40,
    type: 'FieldText',
    isSupported: true,
    description: 'URL',
    valueType: 'STRING',
    alias: ['URL', 'Url']
  },
  {
    id: 20,
    type: 'FieldYesNo',
    isSupported: true,
    description: 'CheckBox',
    valueType: 'BOOLEAN',
    alias: ['YesNo', 'Yes No', 'Yes-No']
  }
]
export default REFERENCES

export const FIELD_RANGE = [
  {
    id: 12,
    type: 'Amount',
    description: 'Number with 4 decimals',
    alias: ['Amount']
  },
  {
    id: 37,
    type: 'Costs+Prices',
    description: 'Costs + Prices (minimum currency precision but if exists more)',
    alias: ['Costs+Prices', 'CostsPrices', 'Cost Prices']
  },
  {
    id: 15,
    type: 'Date',
    description: 'Date mm/dd/yyyy',
    alias: ['Date']
  },
  {
    id: 16,
    type: 'DateTime',
    description: 'Date with time',
    alias: ['DateTime', 'Date Time', 'Date+Time']
  },
  {
    id: 11,
    type: 'Integer',
    description: '10 Digit numeric',
    alias: ['Integer']
  },
  {
    id: 22,
    type: 'Number',
    description: 'Float Number',
    alias: ['Number']
  },
  {
    id: 29,
    type: 'Quantity',
    description: 'Quantity data type',
    alias: ['Quantity']
  },
  {
    id: 24,
    type: 'Time',
    description: 'Time',
    alias: ['Time']
  }
]

export const FIELD_ONLY = [
  {
    id: 28,
    type: 'Button',
    description: 'Command Button - starts a process',
    alias: ['Button']
  }
]

export const FIELD_NOT_SHOWED = [
  {
    id: 28,
    type: 'Button',
    description: 'Command Button - starts a process',
    alias: ['Button']
  }
]

/**
 * Fields with this column name, changed all fields is read only
 */
export const FIELD_READ_ONLY_FORM = [
  {
    columnName: 'IsActive', // column name of field
    defaultValue: true, // default value when loading
    valueIsReadOnlyForm: false, // value that activates read-only form
    isChangedAllForm: false // change the entire form to read only including this field
  },
  {
    columnName: 'Processed',
    defaultValue: false,
    valueIsReadOnlyForm: true,
    isChangedAllForm: true
  },
  {
    columnName: 'Processing',
    defaultValue: true,
    valueIsReadOnlyForm: false,
    isChangedAllForm: true
  }
]

export const FIELDS_FLOATS = ['Amount', 'Costs+Prices', 'Number', 'Quantity']

export const FIELDS_QUANTITY = ['Amount', 'Costs+Prices', 'Integer', 'Number', 'Quantity']
