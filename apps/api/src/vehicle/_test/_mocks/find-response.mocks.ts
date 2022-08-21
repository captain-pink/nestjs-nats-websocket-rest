import { VehicleMessage } from '@vehicle-observer/shared';

export const findResponseLimitOne: Array<VehicleMessage> = [
  {
    primaryChannel: 'vehicle',
    uniqueChannel: 'test-bus-1',
    time: new Date('2017-11-23T11:25:38.000Z'),
    energy: 53.2,
    gps: ['52.093448638916016', '5.117378234863281'],
    odo: 88526.413,
    speed: 0,
    soc: 72.8,
  },
];

export const findResponseLimitSeveral: Array<VehicleMessage> = [
  {
    primaryChannel: 'vehicle',
    uniqueChannel: 'test-bus-1',
    time: new Date('2017-11-23T11:25:38.000Z'),
    energy: 53.2,
    gps: ['52.093448638916016', '5.117378234863281'],
    odo: 88526.413,
    speed: 0,
    soc: 72.8,
  },
  {
    primaryChannel: 'vehicle',
    uniqueChannel: 'test-bus-1',
    time: new Date('2017-11-23T11:25:38.000Z'),
    energy: 53.2,
    gps: ['52.093448638916016', '5.117378234863281'],
    odo: 88526.413,
    speed: 0,
    soc: 72.8,
  },
  {
    primaryChannel: 'vehicle',
    uniqueChannel: 'test-bus-1',
    time: new Date('2017-11-23T11:25:38.000Z'),
    energy: 53.2,
    gps: ['52.093448638916016', '5.117378234863281'],
    odo: 88526.413,
    speed: 0,
    soc: 72.8,
  },
  {
    primaryChannel: 'vehicle',
    uniqueChannel: 'test-bus-1',
    time: new Date('2017-11-23T11:25:38.000Z'),
    energy: 53.2,
    gps: ['52.093448638916016', '5.117378234863281'],
    odo: 88526.413,
    speed: 0,
    soc: 72.8,
  },
];

export const findResponseValidationFailed = {
  response: {
    name: 'CastError',
  },
  status: 404,
  message: 'Not Found Exception',
  name: 'NotFoundException',
};
