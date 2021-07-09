// ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
// Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
// Contributor(s): Yamel Senih ysenih@erpya.com www.erpya.com
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

/**
 * For window, process and smart browser
 */

import window from './window/index.js'
import windowGetters from './window/getters.js'
import process from './process/index.js'
import processGetters from './process/getters.js'
import browser from './browser/index.js'
import browserGetters from './browser/getters.js'

const dictionary = {
  state: {
    ...window.state,
    ...process.state,
    ...browser.state
  },
  mutations: {
    ...window.mutations,
    ...process.mutations,
    ...browser.mutations
  },
  actions: {
    ...window.actions,
    ...process.actions,
    ...browser.actions
  },
  getters: {
    ...windowGetters,
    ...processGetters,
    ...browserGetters
  }
}

export default dictionary
