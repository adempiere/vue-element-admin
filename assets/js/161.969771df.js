(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{356:function(e,t,r){"use strict";r.r(t);var s=r(0),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[e._m(0),e._v(" "),r("p",[e._v("允許您基於以下參數配置每個角色對特定記錄或視圖的訪問權限：")]),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),r("img",{attrs:{src:e.$withBase("/images/components/record-access/ad-zk-window-record-access.png"),alt:"Acceso a Registro Versión de Escritorio ZK",width:"800px"}}),e._v(" "),e._m(3),e._v(" "),r("img",{attrs:{src:e.$withBase("/images/components/record-access/ad-vue-window-record-access.png"),alt:"Acceso a Registro ADempiere-Vue de Escritorio",width:"800px"}}),e._v(" "),r("p",[e._v("通過按記錄使用此配置，您可以自定義每個角色在ADempiere中的顯示和訪問，在角色位於“可用角色”部分時，可以在其中激活記錄的顯示，阻止或簡單地排除它。表示該記錄上沒有任何配置，如果要激活任何配置\n(激活還是阻止），則必須將角色傳遞給“配置的角色”部分，並對該角色應用所需的選項在該特定記錄上。")]),e._v(" "),r("p",[e._v("應當指出，ADempiere中的此操作僅適用於每個記錄和每個角色的記錄；以下是“訪問註冊表”功能的一個實際案例：")]),e._v(" "),r("p",[e._v("需要訪問兩種類型的文檔，一種是讀和寫的，另一種是只讀的，並阻止另一種類型的文檔的視圖")]),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),r("p",[e._v("該操作位於“操作”菜單中的那些窗口中")]),e._v(" "),r("img",{attrs:{src:e.$withBase("/images/components/record-access/ad-vue-location-access-to-registration.png"),alt:"Acceso a Registro ADempiere-Vue Escritorio",width:"800px"}}),e._v(" "),e._m(6),e._v(" "),r("p",[e._v("它用於配置特定註冊表中角色的訪問和鎖定")]),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),r("p",[e._v("##在桌面版中如何使用？")]),e._v(" "),r("p",[e._v("在書面版本中，此組件的用法如下：")]),e._v(" "),r("p",[e._v("-首先，必須找到操作菜單按鈕，然後選中“訪問註冊表”選項")]),e._v(" "),r("p",[e._v("-選中此選項時，將顯示一個窗口，其中顯示角色列表，這些角色將配置其所位於的註冊表的訪問或鎖定。")]),e._v(" "),r("p",[e._v("##在移動版本中如何使用？")]),e._v(" "),r("p",[e._v("在移動版本中，此組件的用法如下：")]),e._v(" "),r("p",[e._v("-首先，必須找到操作菜單按鈕，然後選中“訪問註冊表”選項")]),e._v(" "),r("p",[e._v("-選中此選項時，將在右側顯示一個窗口，其中顯示了一個角色列表，這些角色將配置其所在註冊表的訪問或鎖定。")]),e._v(" "),r("p",[e._v("##開發人員選項")]),e._v(" "),e._m(9),e._v(" "),e._m(10),r("p",[e._v("在这里你可以看到一个"),r("a",{attrs:{href:"https://demo-ui.erpya.com/#/7aa4242a-93c0-42d8-92be-8250002d3e3c/d97027fd-4cd5-445e-8fd8-ef5d3f7959b4/window/147?tabParent=0&tabChild=0&action=43adbe9d-04a7-4cf6-9582-895c1e40da0b&typeAction=recordAccess",target:"_blank",rel:"noopener noreferrer"}},[e._v("演示"),r("OutboundLink")],1)]),e._v(" "),e._m(11),e._v(" "),e._m(12),r("p",[e._v("从该组件中调用的服务有 "),r("br"),e._v(" "),r("a",{attrs:{href:"https://adempiere.github.io/proxy-adempiere-api/guide/default-modules/adempiere-api/user-interface.html#get-api-user-interface-component-record-access-record-access",target:"_blank",rel:"noopener noreferrer"}},[e._v("GET /api/user-interface/component/record-access/record-access"),r("OutboundLink")],1),r("br"),e._v(" "),r("a",{attrs:{href:"https://adempiere.github.io/proxy-adempiere-api/guide/default-modules/adempiere-api/user-interface.html#get-api-user-interface-component-record-access-record-access",target:"_blank",rel:"noopener noreferrer"}},[e._v("POST /api/user-interface/component/record-access/record-access"),r("OutboundLink")],1)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"訪問記錄"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#訪問記錄"}},[this._v("#")]),this._v(" 訪問記錄")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("strong",[e._v("可用角色")]),e._v("：ADempiere中創建了所有角色，這些角色沒有定位的註冊表的任何配置")]),e._v(" "),r("li",[r("strong",[e._v("配置的角色")]),e._v("：有些角色將具有對特定記錄的訪問或阻止的配置，這些訪問或\n鎖取決於以下選項：\n"),r("ul",[r("li",[e._v("阻止：選中此選項後，將阻止角色訪問和查看註冊表，啟用此選項將啟用以下選項：\n-從屬實體：選中此選項只會使一個記錄處於活動狀態，而依賴於該記錄的其他記錄會阻止它們")]),e._v(" "),r("li",[e._v("解鎖：選中此選項可啟用或激活記錄的可視化，啟用此選項後，將啟用以下選項：\n"),r("ul",[r("li",[e._v("只讀：您可以在讀取模式下查看（無法編輯或創建）與角色關聯的記錄")]),e._v(" "),r("li",[e._v("可編輯：您可以以讀寫模式查看（可以編輯或創建）")])])])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"adempiere-zk版本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adempiere-zk版本"}},[this._v("#")]),this._v(" ADempiere-ZK版本")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"adempiere-vue版本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adempiere-vue版本"}},[this._v("#")]),this._v(" ADempiere-Vue版本")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("p",[this._v("要對文檔進行讀寫訪問：文檔類型必須位於ADempiere中，轉到“訪問註冊表”操作，找到角色，然後轉到“配置的角色”部分，選擇“取消阻止”選項，然後選擇“可編輯的“")])]),this._v(" "),t("li",[t("p",[this._v("要僅訪問文檔，請執行以下操作：文檔類型必須位於ADempiere中，轉到操作“訪問註冊表”，找到該角色，然後轉到“配置的角色”部分，選擇選項“取消阻止”和“僅”閱讀“")])]),this._v(" "),t("li",[t("p",[this._v("阻止文檔：ADempiere必須找到文檔的類型，轉到“訪問註冊表”操作，找到該角色，然後轉到“已配置角色”部分，然後選擇“阻止”選項")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"它在哪裡？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#它在哪裡？"}},[this._v("#")]),this._v(" 它在哪裡？")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"是做什麼用的？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#是做什麼用的？"}},[this._v("#")]),this._v(" 是做什麼用的？")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"功能或觀察"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#功能或觀察"}},[this._v("#")]),this._v(" 功能或觀察")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("功能：配置角色以提供訪問權限或阻止記錄")]),this._v(" "),t("li",[this._v("觀察：它僅適用於寄存器和角色，即，如果您要配置一個或多個寄存器，則它們必須一個接一個地執行")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("记录访问")]),this._v("对话框位于以下路径中。")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"language-bash extra-class"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[e._v("└── src                             "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 主要的源代码")]),e._v("\n    └── components                  "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 全局组件")]),e._v("\n        └── ADempiere               "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# ADempiere特定组件")]),e._v("\n            └── RecordAccess        "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 记录访问主目录")]),e._v("\n\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("在以下路径中可以找到"),t("strong",[this._v("记录访问")]),this._v("服务的消费调用。")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"language-bash extra-class"},[r("pre",{pre:!0,attrs:{class:"language-bash"}},[r("code",[e._v("└─ src                            "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 主要的源代码。")]),e._v("\n    └─ api                        "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 全球服务")]),e._v("\n      └─ ADempiere                "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# ADempiere的具体服务")]),e._v("\n            └─ actions            "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 行动")]),e._v("\n                └─ record-access  "),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 记录 访问主服务目录")]),e._v("\n\n")])])])}],!1,null,null,null);t.default=a.exports}}]);