// ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
// Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
// Contributor(s): Elsio Sanchez elsiosanches@gmail.com www.erpya.com
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Get Instance for connectionimport {
import { request } from '@/utils/ADempiere/request'
import { config } from '@/utils/ADempiere/config'

// Payments List
export function paymentList({
  businessPartnerUuid
}) {
  return request({
    url: `${config.allocationPayments.endpoint}/payments`,
    method: 'get',
    params: {
      business_partner_uuid: businessPartnerUuid
    }
  })
    .then(paymentsListResponse => {
      return paymentsListResponse
    })
}
// Invoices List
export function invocesList({
  businessPartnerUuid
}) {
  return request({
    url: `${config.allocationPayments.endpoint}/invoices`,
    method: 'get',
    params: {
      business_partner_uuid: businessPartnerUuid
    }
  })
    .then(invocesListResponse => {
      return invocesListResponse
    })
}
// Payment Allocation Summary List
export function summaryList({
  businessPartnerUuid
}) {
  return request({
    url: `${config.allocationPayments.endpoint}/summary`,
    method: 'get',
    params: {
      business_partner_uuid: businessPartnerUuid
    }
  })
    .then(summaryListResponse => {
      return summaryListResponse
    })
}