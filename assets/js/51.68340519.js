(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{250:function(t,e,a){"use strict";a.r(e);var s=a(0),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("Cuando se completan los proyectos, puedes compilar tu aplicación con solo ejecutar un comando:")]),t._v(" "),t._m(2),t._m(3),t._v(" "),a("p",[t._v("Si necesitas una compilación personalizada, como especificar el directorio dist, debes configurarlo a través de "),a("code",[t._v("outputDir")]),t._v(" en "),a("a",{attrs:{href:"https://github.com/adempiere/adempiere-vue/blob/master/vue.config.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("config"),a("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(4),t._v(" "),a("p",[t._v("La configuración de todos los entornos de prueba o variables de entorno formales se encuentra en el archivo "),a("code",[t._v(".env.xxxx")]),t._v(" como "),a("a",{attrs:{href:"https://github.com/adempiere/adempiere-vue/blob/master/.env.development",target:"_blank",rel:"noopener noreferrer"}},[t._v(".env.development"),a("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(5),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("¡NOTA!")]),t._v(" "),t._m(6),t._v(" "),a("p",[t._v("Puedes acceder a ellas en el código de tu aplicación:")]),t._v(" "),t._m(7),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),a("p",[t._v("Después de ejecutar, puedes ver la distribución de tamaño específico en "),a("a",{attrs:{href:"http://localhost:9526/report.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://localhost:9526/report.html"),a("OutboundLink")],1)]),t._v(" "),t._m(11),t._v(" "),t._m(12)]),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._m(17),t._v(" "),t._m(18),t._v(" "),a("p",[t._v("Simplemente hablando, la diferencia entre ellos es el trato con el enrutamiento. "),a("code",[t._v("hashHistory")]),t._v(" es procesado por la ruta que sigue de "),a("code",[t._v("#")]),t._v(", la gestión de enrutamiento de front-end a través de "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/History_API",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTML 5 History"),a("OutboundLink")],1),t._v(", y "),a("code",[t._v("browserHistory")]),t._v(" es similar a nuestra ruta de acceso de página habitual, y no con "),a("code",[t._v("#")]),t._v(", pero debe a través de la configuración del servidor.")]),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Ver detalles "),a("a",{attrs:{href:"https://router.vuejs.org/guide/essentials/history-mode.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-router document"),a("OutboundLink")],1)])]),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://hub.docker.com/r/erpya/adempiere-grpc-all-in-one",target:"_blank",rel:"noopener noreferrer"}},[t._v("ADempiere gRPC"),a("OutboundLink")],1)])]),t._v(" "),t._m(24),a("ul",[a("li",[a("a",{attrs:{href:"https://hub.docker.com/r/erpya/proxy-adempiere-api",target:"_blank",rel:"noopener noreferrer"}},[t._v("Proxy ADempiere API"),a("OutboundLink")],1)])]),t._v(" "),t._m(25),a("ul",[a("li",[a("a",{attrs:{href:"https://hub.docker.com/r/erpya/adempiere-vue",target:"_blank",rel:"noopener noreferrer"}},[t._v("ADempiere Vue"),a("OutboundLink")],1)])]),t._v(" "),t._m(26),a("ul",[a("li",[a("a",{attrs:{href:"https://hub.docker.com/r/erpya/adempiere-ecommerce",target:"_blank",rel:"noopener noreferrer"}},[t._v("ADempiere eCommerce"),a("OutboundLink")],1)])]),t._v(" "),t._m(27),t._m(28),t._v(" "),t._m(29),t._m(30),t._v(" "),t._m(31),a("p",[t._v("Contenedores de salida:")]),t._v(" "),t._m(32)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"compilar-y-desplegar"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#compilar-y-desplegar"}},[this._v("#")]),this._v(" Compilar y Desplegar")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"compilar"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#compilar"}},[this._v("#")]),this._v(" Compilar")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# compilar para el entorno de producción")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run build:prod\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# compilar para el entorno de pruebas")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run build:stage\n")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[t._v("Después de que el paquete de compilación sea exitoso, la carpeta "),a("code",[t._v("dist")]),t._v(" se generará en el directorio raíz, que es la construcción de un archivo empaquetado, generalmente archivos estáticos como "),a("code",[t._v("***. js")]),t._v(", "),a("code",[t._v("***. css")]),t._v(", "),a("code",[t._v("index.html")]),t._v(", etc.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"variables-de-entorno"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#variables-de-entorno"}},[this._v("#")]),this._v(" Variables de entorno")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Todos se inyectan en el contexto global a través de los complementos "),e("code",[this._v("webpack.DefinePlugin")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Las variables de entorno deben comenzar con "),e("code",[this._v("VUE_APP_")]),this._v(". Tales como: "),e("code",[this._v("VUE_APP_API")]),this._v(", "),e("code",[this._v("VUE_APP_TITLE")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("VUE_APP_xxxx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"analizar-el-tamano-del-archivo-de-compilacion"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#analizar-el-tamano-del-archivo-de-compilacion"}},[this._v("#")]),this._v(" Analizar el tamaño del archivo de compilación")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Si tu archivo de compilación es grande, puedes optimizar tu código compilando y analizando la distribución del tamaño de los módulos dependientes utilizando "),e("code",[this._v("webpack-bundle-analyzer")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[this._v("npm")]),this._v(" run preview -- --report\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"https://adempiere-vue.gitee.io/gitee-cdn/adempiere-vue-site/3fddf034-2b38-4299-b0d2-b748fb2abef0.jpg",alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("TIP")]),this._v(" "),e("p",[this._v("Se recomienda utilizar gzip, después de usarlo, el volumen será solo el 1/3 del original más o menos. También puedes usar Lazy Loading o Code Splitting.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"publicar"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#publicar"}},[this._v("#")]),this._v(" Publicar")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Para la publicación, solo tienes que publicar el archivo estático resultante después de la compilación, que generalmente es el archivo estático en la carpeta "),e("code",[this._v("dist")]),this._v(", en tu cdn o servidor estático. Ten en cuenta que "),e("code",[this._v("index.html")]),this._v(" generalmente será una página de entrada para tu servicio de back-end. Es posible que debas cambiar la ruta de importación de la página después de determinar la estática para JS y CSS.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("TIP")]),this._v(" "),e("p",[this._v("En el despliegue puedes encontrar que la ruta del recurso es incorrecta, simplemente modifica la ruta del archivo de recurso "),e("code",[this._v("@/config/index.js")]),this._v(".")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[this._v("// los cambios se configuran según tu propia ruta")]),this._v("\npublicPath"),e("span",{pre:!0,attrs:{class:"token operator"}},[this._v(":")]),this._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[this._v("'./'")]),this._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"enrutador-y-servidor"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#enrutador-y-servidor"}},[this._v("#")]),this._v(" Enrutador y servidor")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("En adempiere-vue, el enrutamiento front-end usa "),e("code",[this._v("vue-router")]),this._v(", por lo que tienes dos opciones: "),e("code",[this._v("browserHistory")]),this._v(" y "),e("code",[this._v("hashHistory")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Este proyecto utiliza "),e("code",[this._v("hashHistory")]),this._v(" de forma predeterminada, por lo que, si tienes "),e("code",[this._v("#")]),this._v(" en tu URL y deseas deshacerte de él, debes cambiar a "),e("code",[this._v("browserHistory")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Modificar el modo en "),e("code",[this._v("src/router/index.js")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Router")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mode: 'history' // Necesita soporte de backend")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"desplegar-todo-el-ecosistema"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#desplegar-todo-el-ecosistema"}},[this._v("#")]),this._v(" Desplegar todo el Ecosistema")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"para-todos-los-entornos-debe-ejecutar-las-siguientes-imagenes"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#para-todos-los-entornos-debe-ejecutar-las-siguientes-imagenes"}},[this._v("#")]),this._v(" Para todos los entornos, debe ejecutar las siguientes imágenes:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[this._v("docker pull erpya/adempiere-grpc-all-in-one\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[this._v("docker pull erpya/proxy-adempiere-api\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[this._v("docker pull erpya/adempiere-vue\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[this._v("docker pull erpya/adempiere-ecommerce\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"ejecutar-docker-stack"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ejecutar-docker-stack"}},[this._v("#")]),this._v(" Ejecutar Docker Stack")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# docker-compose.yaml")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3.7'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("grpc-backend")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" erpya/adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("grpc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("all"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("in"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("one\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("backend\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stdin_open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" SERVER_PORT=50059\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" SERVICES_ENABLED=access; business; core; dashboarding; dictionary; enrollment; log; ui; workflow; store; pos; updater;\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" SERVER_LOG_LEVEL=WARNING\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" DB_HOST=postgres_host\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" DB_PORT=5432\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" DB_NAME=adempiere\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" DB_USER=adempiere\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" DB_PASSWORD=adempiere\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" DB_TYPE=PostgreSQL\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 50059"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("50059")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("redis")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("4"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("alpine\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("redis\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stdin_open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'6379:6379'")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("es7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" docker.elastic.co/elasticsearch/elasticsearch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("7.3.2\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("eslastic"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("search\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ulimits")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("memlock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("soft")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("-1")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("hard")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("-1")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./elasticsearch.yml"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/usr/share/elasticsearch/config/elasticsearch.yml"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("ro\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'9200:9200'")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'9300:9300'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" discovery.type=single"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("node\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" cluster.name=docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cluster\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" bootstrap.memory_lock=true\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ES_JAVA_OPTS="),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("Xmx512m "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("Xms512m\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("api-rest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" erpya/proxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("api\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("proxy\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("depends_on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" es7\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" redis\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stdin_open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" SERVER_PORT=8085\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" AD_DEFAULT_HOST=adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("backend\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" AD_DEFAULT_PORT=50059\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ES_HOST=adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("eslastic"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("search\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ES_PORT=9200\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" VS_ENV=dev\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" INDEX=vue_storefront_catalog\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" RESTORE_DB=N\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 8085"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8085")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("vue-app")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" erpya/adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("vue\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("frontend\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stdin_open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" API_URL=http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("proxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8085")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 9526"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("e-commerce")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" erpya/adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ecommerce\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ecommerce\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stdin_open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" SERVER_PORT=3000\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" API_URL=http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//adempiere"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("proxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8085")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" STORE_INDEX=vue_storefront_catalog\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" VS_ENV=dev\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 3000"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Nota: El contenedor Elasticsearch requiere un archivo de configuración "),e("code",[this._v("elasticsearch.yaml")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[this._v("# requiere permisos de super usuario del sistema operativo ('su' o 'sudo')")]),this._v("\ndocker-compose up\n")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[t._v("adempiere-backend")]),t._v(" "),a("li",[t._v("adempiere-redis")]),t._v(" "),a("li",[t._v("adempiere-eslastic-search")]),t._v(" "),a("li",[t._v("adempiere-proxy")]),t._v(" "),a("li",[t._v("adempiere-frontend")]),t._v(" "),a("li",[t._v("adempiere-ecommerce")])])}],!1,null,null,null);e.default=n.exports}}]);