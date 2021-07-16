(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{276:function(e,t,o){"use strict";o.r(t);var s=o(0),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),o("p",[e._v("The most recommended way is "),o("code",[e._v("cors")]),e._v(", full name is "),o("code",[e._v("Cross Origin Resource Sharing")]),e._v(". This solution does not make any difference to the front-end write request as usual. The workload is basically on the back-end. For each request, the browser must first send a pre-request as "),o("code",[e._v("OPTIONS")]),e._v(", to know the server-side HTTP method supported for cross-source requests. After confirming that the server allows the cross-source request, then send the real request with the actual HTTP request method. Details "),o("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",target:"_blank",rel:"noopener noreferrer"}},[e._v("MDN Documentation"),o("OutboundLink")],1)]),e._v(" "),o("p",[e._v("The recommended reason is: as long as the first time is configured, no matter how many API interfaces and projects, they can be directly reused, and the cross-domain problem can be solved once and for all, and it can be conveniently used in both the development environment and the formal environment.")]),e._v(" "),e._m(2),e._v(" "),o("p",[e._v("In "),o("code",[e._v("dev")]),e._v(" environment, you can use webpack "),o("code",[e._v("proxy")]),e._v(", it is also very easy to use。 It's recommended that you look at the "),o("a",{attrs:{href:"https://www.webpackjs.com/configuration/dev-server/#devserver-proxy",target:"_blank",rel:"noopener noreferrer"}},[e._v("document"),o("OutboundLink")],1),e._v(" and we're not going to discuss it here. Some of the author's personal projects use this method")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),o("p",[e._v("Here I only recommend these two ways to cross-domain, there are many other cross-domain methods but not recommended.")])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"cors"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cors"}},[this._v("#")]),this._v(" Cors")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The most question be asked is still about "),t("code",[this._v("cross-domain")]),this._v(" issues. In fact, the "),t("code",[this._v("cross-domain")]),this._v(" issue is really not a very difficult question to solve. Here I will briefly summarize several "),t("code",[this._v("cross-domain")]),this._v(" solutions I recommend.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("But there are always some back-end developers who think "),t("code",[this._v("cors")]),this._v(" is too much "),t("code",[this._v("trouble")]),this._v(", they don't want to help the front end to solve cross-domain issues. That pure front-end is also has solutions.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("But this method can not used in the "),o("code",[e._v("production")]),e._v(" environment. In "),o("code",[e._v("production")]),e._v(" environment, you need to use "),o("code",[e._v("nginx")]),e._v(" reverse proxy. Whether "),o("code",[e._v("proxy")]),e._v(" or "),o("code",[e._v("nginx")]),e._v(", the principle is the same. Solve the cross-domain issues by building a transit server to forward requests.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"center"}},[e._v("development")]),e._v(" "),o("th",[e._v("production")])])]),e._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"center"}},[e._v("cors")]),e._v(" "),o("td",[e._v("cors")])]),e._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"center"}},[e._v("proxy")]),e._v(" "),o("td",[e._v("nginx")])])])])}],!1,null,null,null);t.default=r.exports}}]);