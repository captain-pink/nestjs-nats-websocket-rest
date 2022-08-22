import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

/**
 * Class describes WsGateway logic
 * TODO:
 * - To add ping/pong logic to remove inactive connections;
 * - To change ws lib to socket IO in case we need complex solution;
 */
@WebSocketGateway(1000)
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clients: WebSocket[] = [];

  publish(subject: string, payload: unknown) {
    this.clients.forEach((c: WebSocket) =>
      c.send(JSON.stringify({ subject, payload })),
    );
  }

  /**
   * TODO: Rewrite logic to reduce time complexity
   * @param client Ws client
   */
  handleDisconnect(client: WebSocket) {
    this.clients.filter((c: WebSocket) => c !== client);
  }

  /**
   * TODO: Rewrite logic to use better client storage
   * @param client ws client
   */
  handleConnection(client: WebSocket) {
    this.clients.push(client);
  }
}
