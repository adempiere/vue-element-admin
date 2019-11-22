import { export_json_to_excel } from '@/vendor/Export2Excel'

export const supportedTypes = [
  { type: 'xlsx' },
  { type: 'xls' },
  { type: 'txt' },
  { type: 'csv' },
  { type: 'xml' },
  { type: 'html' }
]
export function export_json({
  header,
  data,
  exportType
}) {
  export_json_to_excel({
    header: header,
    data: data,
    filename: '',
    bookType: exportType
  })
}
