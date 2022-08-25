import { plainToClass } from '@nestjs/class-transformer';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import {
  AbstractAnalyticService,
  AnalyticClientRequestDto,
} from '@vehicle-observer/shared';
import { validateOrReject } from 'class-validator';
import { Socket, Server } from 'socket.io';

import {
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult,
} from '../analytic/vehicle/type';

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

  clients: Socket[] = [];

  constructor(
    private readonly analyticService: AbstractAnalyticService<
      VehicleAnalyticProcessorAction,
      VehiclesAnalyticAgregatedResult
    >,
  ) {}

  publish(subject: string, payload: unknown) {
    this.clients.forEach((c: Socket) => {
      c.emit(subject, JSON.stringify({ payload }));
    });
  }

  @SubscribeMessage('analyse')
  async handleEvent(@MessageBody() data: string): Promise<any | void> {
    const parsed = parseWsMessage(data);
    const model = plainToClass(
      AnalyticClientRequestDto<VehicleAnalyticProcessorAction>,
      parsed,
    );

    await validateOrReject(model);

    return this.analyticService.analyse<any>(model.action, {
      dataframe: 10,
    });
  }

  /**
   * TODO: Rewrite logic to reduce time complexity
   * @param client Ws client
   */
  handleDisconnect(client: Socket) {
    this.clients.filter((c: Socket) => c !== client);
  }

  /**
   * TODO: Rewrite logic to use better client storage
   * @param client ws client
   */
  handleConnection(client: Socket) {
    this.clients.push(client);
  }
}

function parseWsMessage(message: string) {
  try {
    return JSON.parse(message);
  } catch {
    return message;
  }
}
