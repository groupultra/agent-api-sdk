import { kindOf } from '@/utils/index';
import WebSocket from 'ws'; // Import the module using ECMAScript import syntax
const isNodeSocketSupported =
  typeof process !== 'undefined' && kindOf(process) === 'process';
export default isNodeSocketSupported &&
  class MSocket {
    type: string = 'node';
    constructor() {
      console.log('node', this, WebSocket);
    }
  };
