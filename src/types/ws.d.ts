declare module 'ws' {
  import WebSocket = require('ws');
  export = WebSocket;
  export as namespace WebSocket;
}
