var port = null;

// function sendNativeMessage() {
//   message = { "text": document.getElementById('input-text').value };
//   port.postMessage(message);
//   appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
// }

function onNativeMessage(message) {
  message.udp.host
  var config = {
    mode: "pac_script",
    pacScript: {
      data: `function FindProxyForURL(url, host) {
              if (host == '${message.udp.host}')
                return 'PROXY ${message.udp.proxy}';
              return 'DIRECT';
            }`
    }
  };
  console.log(config)
  chrome.proxy.settings.set(
    { value: config, scope: 'regular' },
    function () { });

}

function connect() {
  var hostName = "com.google.chrome.captcha.harvester";
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
}
// {"host": "www.sneakersnstuff.com", "proxy": "127.0.0.1:8899"}

connect()
