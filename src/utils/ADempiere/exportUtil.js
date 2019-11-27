import { export_json_to_excel } from '@/vendor/Export2Excel'
import language from '@/lang'

export const supportedTypes = {
  xlsx: language.t('report.ExportXlsx'),
  xls: language.t('report.ExportXls'),
  xml: language.t('report.ExporXml'),
  csv: language.t('report.ExporCsv'),
  txt: language.t('report.ExportTxt'),
  html: language.t('report.ExportHtml')
}
export function exportFileFromJson({
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
