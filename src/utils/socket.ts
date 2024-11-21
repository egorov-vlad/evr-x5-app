import WebSocket from 'ws';
import http from 'http';

export let webSocketServer: WebSocket.Server;

export const createServer = (server: http.Server) => {
  webSocketServer = new WebSocket.Server({ server });
  webSocketServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: WebSocket.RawData) => {
      webSocketServer.clients.forEach(client => client.send(message));
    });

    ws.on('ping', () => ws.pong());
  });
}

interface IMessageToSocket {
  user: {
    firstName?: string;
    lastName?: string;
    userId: number;
    rpmId?: string;
    avatarUrl?: string;
  };
  actionName: string;
  actionValue?: string;
  lobbyId: number;
}

export const sendMessageToSocket = async (message: IMessageToSocket) => {
  webSocketServer.clients.forEach(client =>
    client.send(JSON.stringify({ ...message })));
}

