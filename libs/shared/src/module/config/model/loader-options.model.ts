import { MicroserviceOptions } from '@nestjs/microservices';
import { toInt } from '@vehicle-observer/shared';

type LoaderOptionsConstructor = {
  protocol: string;
  transport: string;
  host: string;
  port: number;
};

export class LoaderOptions {
  private readonly transport: number;
  private readonly host: string;
  private readonly protocol: string;
  private readonly port: number;

  constructor({ transport, host, port, protocol }: LoaderOptionsConstructor) {
    this.transport = toInt(transport);
    this.protocol = protocol;
    this.host = host;
    this.port = port;
  }

  toUrl(): string {
    return `${this.protocol}://${this.host}:${this.port}`;
  }

  asMicroserviceOptions(): MicroserviceOptions {
    return {
      transport: this.transport,
      options: {
        servers: this.toUrl(),
      },
    };
  }
}
