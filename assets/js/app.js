// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"
import {
  Socket
} from "phoenix"
import NProgress from "nprogress"
import {
  LiveSocket
} from "phoenix_live_view"

const Hooks = {};
let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")

// Show progress bar on live navigation and form submits
window.addEventListener("phx:page-loading-start", info => NProgress.start())
window.addEventListener("phx:page-loading-stop", info => NProgress.done())

// *****
// JavaScript code to handle CodeMirror
// *****
const codeInput = document.getElementById('json-code');
const startCodeMirror = (textarea) => {
  Promise.all([
    import( /* webpackChunkName: "cm_css" */ 'codemirror/lib/codemirror.css'),
    import( /* webpackChunkName: "cm_javascript" */ 'codemirror/mode/javascript/javascript.js'),
    import( /* webpackChunkName: "cm" */ 'codemirror/lib/codemirror.js'),
  ]).then(([cmcss, cmjs, cm]) => {
    const editArea = cm.fromTextArea(textarea, {
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true
      },
    });
    editArea.setSize('100%', '500px');
  });
};

Hooks.loadEditor = {
  mounted() {
    startCodeMirror(codeInput);
  }
}
// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
// ***********
// Live Socket
// ***********
const liveSocket = new LiveSocket('/live', Socket, {
  params: {
    _csrf_token: csrfToken
  },
  hooks: Hooks,
});
// connect if there are any LiveViews on the page
liveSocket.connect()
window.liveSocket = liveSocket
