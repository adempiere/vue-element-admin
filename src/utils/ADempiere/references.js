// component size's, and path or type of Field Component
export const FIELD_BINARY = {
  type: 'FieldBinary',
  size: {
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  }
}

export const FIELD_BUTTON = {
  type: 'FieldButton',
  size: {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0
  }
}

export const FIELD_COLOR = {
  type: 'FieldColor',
  size: {
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  }
}

export const FIELD_DATE = {
  type: 'FieldDate',
  size: {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  }
}

export const FIELD_IMAGE = {
  type: 'FieldImage',
  size: {
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6
  }
}

export const FIELD_NUMBER = {
  type: 'FieldNumber',
  size: {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  }
}

export const FIELD_SELECT = {
  type: 'FieldSelect',
  size: {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  }
}

export const FIELD_TEXT = {
  type: 'FieldText',
  size: {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  }
}

export const FIELD_TEXT_LONG = {
  type: 'FieldTextLong',
  size: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24
  }
}

export const FIELD_TIME = {
  type: 'FieldTime',
  size: {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6
  }
}

export const FIELD_YES_NO = {
  type: 'FieldYesNo',
  size: {
    xs: 14,
    sm: 8,
    md: 8,
    lg: 3,
    xl: 6
  }
}

export const FIELDS_DISPLAY_SIZES = [
  FIELD_BINARY,
  FIELD_BUTTON,
  FIELD_COLOR,
  FIELD_DATE,
  FIELD_IMAGE,
  FIELD_NUMBER,
  FIELD_SELECT,
  FIELD_TEXT,
  FIELD_TEXT_LONG,
  FIELD_YES_NO
]

export const DEFAULT_SIZE = {
  xs: 6,
  sm: 8,
  md: 2,
  lg: 6,
  xl: 6
}

// This file is used for set a static values for references of fields,
// currently exists for ADempiere metadata distints display types and are represented for follow:

// Account Element
export const ACCOUNT_ELEMENT = {
  ...FIELD_TEXT,
  id: 25,
  isSupported: false,
  description: 'Account Element',
  valueType: 'INTEGER',
  alias: ['Account']
}

// Number
export const NUMBER = {
  ...FIELD_NUMBER,
  id: 12,
  isSupported: true,
  description: 'Number with 4 decimals',
  valueType: 'DECIMAL',
  alias: ['Amount']
}

// Resource Assignment
export const RESOURCE_ASSIGNMENT = {
  ...FIELD_TEXT,
  id: 33,
  isSupported: false,
  description: 'Resource Assignment',
  valueType: 'INTEGER',
  alias: ['Assignment']
}

// Binary Data
export const BINARY_DATA = {
  ...FIELD_BINARY,
  id: 23,
  isSupported: true,
  description: 'Binary Data',
  valueType: 'INTEGER',
  alias: ['Binary']
}

// Button
export const BUTTON = {
  // this component is hidden
  ...FIELD_BUTTON,
  id: 28,
  isSupported: true,
  description: 'Command Button - starts a process',
  valueType: 'STRING',
  alias: ['Button']
}

// Chart
export const CHART = {
  ...FIELD_TEXT,
  id: 53370,
  isSupported: false,
  description: 'Chart',
  valueType: 'STRING',
  alias: ['Chart']
}

// Color
export const COLOR = {
  ...FIELD_TEXT,
  id: 27,
  isSupported: false,
  description: 'Color element',
  valueType: 'INTEGER',
  alias: ['Color']
}

// Cost or Prices
export const COSTS_PLUS_PRICES = {
  ...FIELD_NUMBER,
  id: 37,
  isSupported: true,
  description: 'Costs + Prices (minimum currency precision but if exists more)',
  valueType: 'DECIMAL',
  alias: ['Costs+Prices', 'CostsPrices', 'Cost Prices']
}

// Date
export const DATE = {
  ...FIELD_DATE,
  id: 15,
  isSupported: true,
  description: 'Date mm/dd/yyyy',
  valueType: 'DATE',
  alias: ['Date']
}

// Date with time
export const DATE_PLUS_TIME = {
  ...FIELD_DATE,
  id: 16,
  isSupported: true,
  description: 'Date with time',
  valueType: 'DATE',
  alias: ['DateTime', 'Date Time', 'Date+Time']
}

// Local File
export const LOCAL_FILE = {
  ...FIELD_TEXT,
  id: 39,
  isSupported: true,
  description: 'Local File',
  valueType: 'STRING',
  alias: ['FileName', 'File Name']
}

// Local File Path
export const LOCAL_FILE_PATH = {
  ...FIELD_TEXT,
  id: 38,
  isSupported: true,
  description: 'Local File Path',
  valueType: 'STRING',
  alias: ['FilePath', 'File Path']
}

// Local File Path or Name
export const LOCAL_FILE_PATH_OR_NAME = {
  ...FIELD_TEXT,
  id: 53670,
  isSupported: true,
  description: 'Local File Path or Name',
  valueType: 'STRING',
  alias: ['FilePathOrName', 'File Path Or Name']
}

// ID
export const ID = {
  ...FIELD_NUMBER,
  id: 13,
  isSupported: true,
  description: '10 Digit Identifier',
  valueType: 'INTEGER',
  alias: ['ID']
}

// Binary Image Data
export const BINARY = {
  ...FIELD_IMAGE,
  id: 32,
  isSupported: true,
  description: 'Binary Image Data',
  valueType: 'INTEGER',
  alias: ['Image']
}

// Integer
export const INTEGER = {
  ...FIELD_NUMBER,
  id: 11,
  isSupported: true,
  description: '10 Digit numeric',
  valueType: 'INTEGER',
  alias: ['Integer']
}

// Reference List
export const LIST = {
  ...FIELD_SELECT,
  id: 17,
  isSupported: true,
  description: 'Reference List',
  valueType: 'STRING',
  alias: ['List']
}

// Location Address
export const LOCATION_ADDRESS = {
  ...FIELD_TEXT,
  id: 21,
  type: 'FieldText',
  isSupported: false,
  description: 'Location/Address',
  valueType: 'INTEGER',
  alias: ['Location', 'Location (Address)', 'Location/Address']
}

// Warehouse Locator Data type
export const LOCATOR_WAREHOUSE = {
  ...FIELD_SELECT,
  id: 31,
  isSupported: true,
  description: 'Warehouse Locator Data type',
  valueType: 'INTEGER',
  alias: ['Locator', 'Locator (WH)', 'Locator/WH']
}

// Memo
export const MEMO = {
  ...FIELD_TEXT_LONG,
  id: 34,
  isSupported: true,
  valueType: 'STRING',
  description: 'Reference List',
  alias: ['Memo']
}

// Float Number
export const FLOAT = {
  ...FIELD_NUMBER,
  id: 22,
  isSupported: true,
  description: 'Float Number',
  valueType: 'DECIMAL',
  alias: ['Number']
}

// Printer Name
export const PRINTER_NAME = {
  ...FIELD_TEXT,
  id: 42,
  isSupported: true,
  description: 'Printer Name',
  valueType: 'STRING',
  alias: ['PrinterName', 'Printer Name']
}

// Product Attribute
export const PRODUCT_ATTRIBUTE = {
  ...FIELD_TEXT,
  id: 35,
  isSupported: false,
  description: 'Product Attribute',
  valueType: 'INTEGER',
  alias: ['ProductAttribute', 'Product Attribute']
}

// Quantity
export const QUANTITY = {
  ...FIELD_NUMBER,
  id: 29,
  isSupported: true,
  description: 'Quantity data type',
  valueType: 'DECIMAL',
  alias: ['Quantity']
}

// Search
export const SEARCH = {
  ...FIELD_SELECT,
  id: 30,
  isSupported: true,
  description: 'Search Field',
  valueType: 'INTEGER',
  alias: ['Search']
}

// Char (display type String)
export const CHAR = {
  ...FIELD_TEXT,
  id: 10,
  isSupported: true,
  description: 'Character String',
  valueType: 'STRING',
  alias: ['String']
}

// Table List
export const TABLE = {
  ...FIELD_SELECT,
  id: 18,
  isSupported: true,
  description: 'Table List',
  valueType: 'INTEGER',
  alias: ['Table']
}

// Table Dir
export const TABLE_DIRECT = {
  ...FIELD_SELECT,
  id: 19,
  isSupported: true,
  description: 'Direct Table Access',
  valueType: 'INTEGER',
  alias: ['TableDirect', 'Table Direct']
}

// Text
export const TEXT = {
  ...FIELD_TEXT,
  id: 14,
  isSupported: true,
  description: 'Character String up to 2000 characters',
  valueType: 'STRING',
  alias: ['Text']
}

// Text Long
export const TEXT_LONG = {
  ...FIELD_TEXT_LONG,
  id: 36,
  isSupported: true,
  description: 'Text (Long) - Text > 2000 characters',
  valueType: 'STRING',
  alias: ['TextLong', 'Text Long']
}

// Time
export const TIME = {
  ...FIELD_TIME,
  id: 24,
  isSupported: true,
  description: 'Time',
  valueType: 'DATE',
  alias: ['Time']
}

// URL
export const URL = {
  ...FIELD_TEXT,
  id: 40,
  isSupported: true,
  description: 'URL',
  valueType: 'STRING',
  alias: ['URL', 'Url']
}

// Yes No
export const YES_NO = {
  ...FIELD_YES_NO,
  id: 20,
  isSupported: true,
  description: 'CheckBox',
  valueType: 'BOOLEAN',
  alias: ['YesNo', 'Yes No', 'Yes-No']
}

// Some helper methods
export function isLookup(displayType) {
  return displayType === LIST.id ||
  displayType === TABLE.id ||
  displayType === TABLE_DIRECT.id ||
  displayType === SEARCH.id ||
  displayType === ACCOUNT_ELEMENT.id ||
  displayType === LOCATION_ADDRESS.id ||
  displayType === LOCATOR_WAREHOUSE.id ||
  displayType === PRODUCT_ATTRIBUTE.id ||
  displayType === RESOURCE_ASSIGNMENT.id
}

/**
 * All references
 * {number} id: Identifiert to field reference
 * {string|array} valueType: to convert and send server with gRPC
 * {boolean} isSupported: Indicate if field is suported
 */
const REFERENCES = [
  ACCOUNT_ELEMENT,
  NUMBER,
  RESOURCE_ASSIGNMENT,
  BINARY_DATA,
  BUTTON,
  CHART,
  COLOR,
  COSTS_PLUS_PRICES,
  DATE,
  DATE_PLUS_TIME,
  LOCAL_FILE,
  LOCAL_FILE_PATH,
  LOCAL_FILE_PATH_OR_NAME,
  ID,
  BINARY,
  INTEGER,
  LIST,
  LOCATION_ADDRESS,
  LOCATOR_WAREHOUSE,
  MEMO,
  FLOAT,
  PRINTER_NAME,
  PRODUCT_ATTRIBUTE,
  QUANTITY,
  SEARCH,
  // String as CHAR
  CHAR,
  TABLE,
  TABLE_DIRECT,
  TEXT,
  TEXT_LONG,
  TIME,
  URL,
  YES_NO
]
export default REFERENCES

export const FIELDS_RANGE = [
  NUMBER,
  COSTS_PLUS_PRICES,
  DATE,
  DATE_PLUS_TIME,
  INTEGER,
  FLOAT,
  QUANTITY,
  TIME
]
/**
 * Fields not showed in panel's
 */
export const FIELDS_HIDDEN = [
  BUTTON
]

/**
 * Fields with this column name, changed all fields is read only
 */
export const FIELDS_READ_ONLY_FORM = [
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

export const FIELDS_DECIMALS = [
  COSTS_PLUS_PRICES.id,
  NUMBER.id,
  QUANTITY.id
]

export const FIELDS_QUANTITY = [
  COSTS_PLUS_PRICES.id,
  INTEGER.id,
  NUMBER.id,
  QUANTITY.id
]
