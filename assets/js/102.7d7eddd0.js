(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{299:function(e,t,s){"use strict";s.r(t);var o=s(0),i=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[e._m(0),e._v(" "),s("p",[e._v("Allows you to configure the access that each role will have to a specific record or view based on the following parameters:")]),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),s("img",{attrs:{src:e.$withBase("/images/components/record-access/ad-zk-window-record-access.png"),alt:"Acceso a Registro Versión de Escritorio ZK",width:"800px"}}),e._v(" "),e._m(3),e._v(" "),s("img",{attrs:{src:e.$withBase("/images/components/record-access/ad-vue-window-record-access.png"),alt:"Acceso a Registro ADempiere-Vue de Escritorio",width:"800px"}}),e._v(" "),s("p",[e._v('By using this configuration by records, you are customizing the display and access that each role will have in ADempiere, where you can activate the display of\na record, block or simply exclude, when the role is in the "Available Roles" section, it would indicate that It does not have any configuration on that record,\nif you want to activate any configuration, whether to activate or block, you would have to pass the role to the "Configured Roles" section and apply the option\nyou want with that role on that specific record.')]),e._v(" "),s("p",[e._v('It should be noted that this action in ADempiere applies only records per record and per role; a practical case for the functions of the "Access to Registry" is\nthe following:')]),e._v(" "),s("p",[e._v("It is required to give access to two types of documents, one read and write, another read only and block the view of another type of document")]),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),s("p",[e._v("This action is located those windows that have in the actions menu")]),e._v(" "),s("img",{attrs:{src:e.$withBase("/images/components/record-access/ad-vue-location-record-access.png"),alt:"Acceso a Registro ADempiere-Vue Escritorio",width:"800px"}}),e._v(" "),e._m(6),e._v(" "),s("p",[e._v("It is used to configure the accesses and locks of a role in a specific registry")]),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),e._m(9),e._v(" "),s("p",[e._v("In the written version, this component is used as follows:")]),e._v(" "),e._m(10),e._v(" "),e._m(11),e._v(" "),s("p",[e._v("In the mobile version this component is used as follows:")]),e._v(" "),e._m(12),e._v(" "),e._m(13),e._v(" "),e._m(14),e._v(" "),e._m(15),s("p",[e._v("Here you can see a "),s("a",{attrs:{href:"https://demo-ui.erpya.com/#/7aa4242a-93c0-42d8-92be-8250002d3e3c/d97027fd-4cd5-445e-8fd8-ef5d3f7959b4/window/147?tabParent=0&tabChild=0&action=43adbe9d-04a7-4cf6-9582-895c1e40da0b&typeAction=recordAccess",target:"_blank",rel:"noopener noreferrer"}},[e._v("Demo"),s("OutboundLink")],1)]),e._v(" "),e._m(16),e._v(" "),e._m(17),s("p",[e._v("The services called from the component are "),s("br"),e._v(" "),s("a",{attrs:{href:"https://adempiere.github.io/proxy-adempiere-api/guide/default-modules/adempiere-api/user-interface.html#get-api-user-interface-component-record-access-record-access",target:"_blank",rel:"noopener noreferrer"}},[e._v("GET /api/user-interface/component/record-access/record-access"),s("OutboundLink")],1),s("br"),e._v(" "),s("a",{attrs:{href:"https://adempiere.github.io/proxy-adempiere-api/guide/default-modules/adempiere-api/user-interface.html#get-api-user-interface-component-record-access-record-access",target:"_blank",rel:"noopener noreferrer"}},[e._v("POST /api/user-interface/component/record-access/record-access"),s("OutboundLink")],1)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"record-access"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#record-access"}},[this._v("#")]),this._v(" Record Access")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",[s("li",[s("strong",[e._v("Available Roles")]),e._v(": There are all the roles created in ADempiere, which do not have any configuration of the registry which is positioned")]),e._v(" "),s("li",[s("strong",[e._v("Configured Roles")]),e._v(": There are the roles which will have a configuration of access or blocking to a specific record, these accesses or\nlocks depends on the following options:\n"),s("ul",[s("li",[e._v("Block: When this option is checked, the role is blocked from accessing and viewing the registry, having this option enabled enables the following option:\n"),s("ul",[s("li",[e._v("Dependent Entities: Checking this option leaves only one records active and the other records dependent on it blocks them")])])]),e._v(" "),s("li",[e._v("Unlock: Checking this option enables or activates the visualization of the records, having this option enabled the following options are enabled:\n"),s("ul",[s("li",[e._v("Read Only: You can view in read mode (You cannot edit or create) the records that are associated with the role")]),e._v(" "),s("li",[e._v("Editable: You can view in read and write mode (you can edit or create)")])])])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"adempiere-zk-version"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adempiere-zk-version"}},[this._v("#")]),this._v(" ADempiere-ZK version")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"adempiere-vue-version"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adempiere-vue-version"}},[this._v("#")]),this._v(" ADempiere-Vue version")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("p",[this._v('For reading and writing access to the document: The document type must be located in ADempiere, go to the "Access to Registry" action, locate the role and go to the "Configured Roles" section, select the "Unblock" option and " Editable "')])]),this._v(" "),t("li",[t("p",[this._v('To access the document only read: The type of document must be located in ADempiere, go to the action "Access to Registry", locate the role and go to the section "Configured Roles", select the option "Unblock" and "Only Read "')])]),this._v(" "),t("li",[t("p",[this._v('To block a document: ADempiere the type of document must be located, go to the action "Access to Registry", locate the role and go to the section "Configured Roles" and select the option "Block"')])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"where-it-is-located"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#where-it-is-located"}},[this._v("#")]),this._v(" Where it is located?")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"what-is-it-for"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-is-it-for"}},[this._v("#")]),this._v(" What is it for?")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"functions-or-observations"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#functions-or-observations"}},[this._v("#")]),this._v(" Functions or Observations")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Function: Configuration of roles to give access or block a record")]),this._v(" "),t("li",[this._v("Observation: It only applies by registers and by roles, that is, if you want to configure one or more registers, they must do one by one")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"how-is-it-used-in-the-desktop-version"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-is-it-used-in-the-desktop-version"}},[this._v("#")]),this._v(" How is it used in the Desktop version?")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("p",[this._v('First of all, the actions menu button must be located, then check the option "Access to Registry"')])]),this._v(" "),t("li",[t("p",[this._v("When this option is checked, a window will be displayed showing the list of roles which will configure the accesses or locks of the registry in which it is positioned.")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"how-is-it-used-in-the-mobile-version"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-is-it-used-in-the-mobile-version"}},[this._v("#")]),this._v(" How is it used in the mobile version?")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("p",[this._v('First of all, the actions menu button must be located, then check the option "Access to Registry"')])]),this._v(" "),t("li",[t("p",[this._v("When this option is checked, a window will be displayed on the right side where it shows a list of roles which will configure the accesses or locks of the registry in which it is positioned.")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"developer-options"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#developer-options"}},[this._v("#")]),this._v(" Developer Options")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The "),t("strong",[this._v("Records Access")]),this._v(" dialog is located in the following path:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("└── src                             "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Main source code")]),e._v("\n    └── components                  "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Global components")]),e._v("\n        └── ADempiere               "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# ADempiere specific components")]),e._v("\n            └── RecordAccess        "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Records Access main directory")]),e._v("\n\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The "),t("strong",[this._v("Records Access")]),this._v(" service consumption call can be found in the following path:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("└─ src                            "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Main source code.")]),e._v("\n    └─ api                        "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Global services")]),e._v("\n      └─ ADempiere                "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# ADempiere specific services")]),e._v("\n            └─ actions            "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Actions")]),e._v("\n                └─ record-access  "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Records Access main service directory")]),e._v("\n\n")])])])}],!1,null,null,null);t.default=i.exports}}]);