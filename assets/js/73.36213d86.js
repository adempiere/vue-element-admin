(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{270:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("p",[t._v("This project is based on the element-ui default visual style. If you have additional requirements for visual style, you can follow the official custom theme "),s("a",{attrs:{href:"http://element.eleme.io/#/en-US/component/custom-theme",target:"_blank",rel:"noopener noreferrer"}},[t._v("guide"),s("OutboundLink")],1),t._v(". The method is implemented by covering style variables.")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),s("p",[t._v("Or use "),s("a",{attrs:{href:"https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors",target:"_blank",rel:"noopener noreferrer"}},[t._v("Deep Selectors"),s("OutboundLink")],1),t._v("。")]),t._v(" "),t._m(3),s("p",[t._v("Some global element-ui style modifications can be set in "),s("a",{attrs:{href:"https://github.com/adempiere/adempiere-vue/blob/master/src/styles/element-ui.scss",target:"_blank",rel:"noopener noreferrer"}},[t._v("@/styles/element-ui.scss"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("br"),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("This project provides two kinds of dynamic skinning functions, each has its own advantages and disadvantages. Please choose according to your own needs.")]),t._v(" "),t._m(5),t._v(" "),s("p",[t._v("After the element-ui is upgraded to 2.0, the dynamic peel function is provided in the upper right corner of the official document. This project also provides a change function.")]),t._v(" "),s("p",[t._v("Code: "),s("a",{attrs:{href:"https://github.com/adempiere/adempiere-vue/blob/master/src/components/ThemePicker/index.vue",target:"_blank",rel:"noopener noreferrer"}},[t._v("@/components/ThemePicker"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("p",[s("strong",[t._v("Briefly explain its principle:")]),t._v(" All styles after element-ui version 2.0 are based on SCSS, all colors are set based on a few basic color "),s("a",{attrs:{href:"https://github.com/adempiere/custom-element-theme/blob/master/element-variables.scss",target:"_blank",rel:"noopener noreferrer"}},[t._v("variables"),s("OutboundLink")],1),t._v(", so it is not difficult to achieve dynamic skinning, as long as find a few color variables to modify it. First, we need to get the version number of element-ui through "),s("code",[t._v("package.json")]),t._v(" and request the corresponding style according to the version number. After you get the style, you will change the color, replace it with the color variable you want, and then dynamically add the "),s("code",[t._v("style")]),t._v(" tag to override the original CSS style.")]),t._v(" "),t._m(6),t._v(" "),t._m(7),t._m(8),t._v(" "),s("p",[t._v("Import the ThemePicker component to your project")]),t._v(" "),t._m(9),t._m(10),t._v(" "),s("br"),t._v(" "),s("br"),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),s("blockquote",[s("p",[t._v("We have made corresponding changes here based on the official theme generation library "),s("a",{attrs:{href:"https://github.com/ElementUI/element-theme",target:"_blank",rel:"noopener noreferrer"}},[t._v("element-theme"),s("OutboundLink")],1),t._v(".")])]),t._v(" "),s("p",[t._v("First download "),s("a",{attrs:{href:"https://github.com/adempiere/custom-element-theme",target:"_blank",rel:"noopener noreferrer"}},[t._v("custom-element-theme"),s("OutboundLink")],1)]),t._v(" "),t._m(14),s("p",[t._v("Globally installed theme generation tool")]),t._v(" "),t._m(15),s("p",[t._v("Enter the project directory Install dependencies")]),t._v(" "),t._m(16),t._m(17),t._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("If you need to modify the name of the package generation style namespace, just modify the "),s("a",{attrs:{href:"https://github.com/adempiere/custom-element-theme/blob/master/gulpfile.js#L6",target:"_blank",rel:"noopener noreferrer"}},[t._v("variable"),s("OutboundLink")],1),t._v(".")])]),t._v(" "),t._m(18)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"theme"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#theme"}},[this._v("#")]),this._v(" Theme")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"style-override"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#style-override"}},[this._v("#")]),this._v(" Style override")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The generic style variables for element-ui may not satisfy all custom requirements, and you can do this by overriding the default component style.Since the element-ui style is introduced globally, you can't add scoped if you want to override its style in a "),e("code",[this._v("view")]),this._v(", but if you want to override only the element style of the page, you can use it. Add a class to the parent to use the namespace to solve the problem.")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* Your namespace */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".article-page")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* element-ui tag */")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".el-tag")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("margin-right")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"dynamic-theme"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dynamic-theme"}},[this._v("#")]),this._v(" Dynamic theme")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"element-ui-official-method"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#element-ui-official-method"}},[this._v("#")]),this._v(" Element-ui official method")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("TIP")]),this._v(" "),e("p",[this._v("It is necessary to obtain the version of element-ui to lock the version so as to avoid the impact of non-compatible updates when the Element is upgraded in the future.")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" version "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'element-ui/package.json'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("version\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" url "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("https://unpkg.com/element-ui@")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("version"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/lib/theme-chalk/index.css")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getCSSString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" chalkHandler"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'chalk'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getCSSString")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" variable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" xhr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  xhr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onreadystatechange")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readyState "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" xhr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("variable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" xhr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("responseText"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("@font-face{[^}]+}")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("callback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  xhr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  xhr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("How to use")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[this._v("import")]),this._v(" ThemePicker "),e("span",{pre:!0,attrs:{class:"token keyword"}},[this._v("from")]),this._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[this._v("'@/components/ThemePicker'")]),this._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("Advantage\n"),e("ul",[e("li",[this._v("No need to prepare multiple sets of themes, free dynamic theme")])])]),this._v(" "),e("li",[this._v("Shortcomings\n"),e("ul",[e("li",[this._v("Not enough customization, only support switching of basic colors")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"multiple-sets-of-theme"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#multiple-sets-of-theme"}},[this._v("#")]),this._v(" Multiple sets of theme")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[t._v("This method is the most common way of theme, storing multiple sets of themes locally, both with different namespaces, such as writing two sets of themes, a set called "),s("code",[t._v("day-theme")]),t._v(", a set called "),s("code",[t._v("night-theme")]),t._v(", and "),s("code",[t._v("night-theme.")]),t._v(" Themes are all under a "),s("code",[t._v(".night-theme")]),t._v(" namespace, and we dynamically add "),s("code",[t._v(".night-theme")]),t._v(" on body; remove "),s("code",[t._v(".night-theme")]),t._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"how-to-use"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#how-to-use"}},[this._v("#")]),this._v(" How to use")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("git@github.com:PanJiaChen/custom-element-theme.git\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[this._v("npm")]),this._v(" i element-theme -g\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[this._v("install")]),this._v("\n")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[t._v("First execute "),s("code",[t._v("et -i")]),t._v(" to generate "),s("code",[t._v("element-variables.scss")]),t._v(" file that stores style variables, then enter "),s("code",[t._v("element-variables.scss")]),t._v(" file to modify your own variables, execute "),s("code",[t._v("et")]),t._v(" after modification, compile subject, and finally Execute "),s("code",[t._v("gulp")]),t._v(" to generate a namespace. All generated files are in the "),s("code",[t._v("dist")]),t._v(" directory. You just copy all the contents of the file to "),s("code",[t._v("src/assets/custom-theme")]),t._v(" in the "),s("code",[t._v("adempiere-vue")]),t._v(" project.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"https://adempiere-vue.gitee.io/gitee-cdn/adempiere-vue-site/0726b472-90f4-4fe9-a665-26fb8f9795c3.gif",alt:""}})])}],!1,null,null,null);e.default=n.exports}}]);