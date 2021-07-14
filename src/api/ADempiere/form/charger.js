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

// Charge List
export function chargeList({
  fromUuid
}) {
  return request({
    url: `${config.charge.endpoint}/charge-list`,
    method: 'get',
    params: {
      from_uuid: fromUuid
    }
  })
    .then(chargeListResponse => {
      return chargeListResponse
    })
}
// Create Charge
export function createCharge({
  fromUuid,
  value,
  name,
  spending
}) {
  return request({
    url: `${config.charge.endpoint}/create-charge`,
    method: 'post',
    data: {
      from_uuid: fromUuid,
      value,
      name,
      spending
    }
  })
    .then(chargertResponse => {
      return chargertResponse
    })
}
// Create charge from account
export function createChargeAccount({
  fromUuid,
  accounUuid
}) {
  return request({
    url: `${config.charge.endpoint}/create-charge-account`,
    method: 'post',
    data: {
      from_uuid: fromUuid,
      accoun_uuid: accounUuid
    }
  })
    .then(chargeAccountResponse => {
      return chargeAccountResponse
    })
}
