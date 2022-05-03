export const wsConnect = (host: any) => ({ type: 'WS_CONNECT', host });
export const wsConnecting = (host: any) => ({ type: 'WS_CONNECTING', host });
export const wsConnected = (host: any) => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = (host: any) => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = (host: any) => ({ type: 'WS_DISCONNECTED', host });