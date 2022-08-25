import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  Application,
  ConfigModule,
  Environment,
  FindVehicleByIdDto,
  FindVehicleMessageDto,
  VehicleMessageDao,
} from '@vehicle-observer/shared';
import { plainToClass } from 'class-transformer';

import { VehicleController } from '../vehicle.controller';
import { VehicleModule } from '../vehicle.module';

import {
  findPaging,
  findResponseLimitOne,
  findResponseLimitSeveral,
  findResponseValidationFailed,
} from './_mocks/find-response.mocks';
import { findByIdResponse } from './_mocks/find-by-id-response.mock';

describe('VehicleController', () => {
  let controller: VehicleController;
  let dao: VehicleMessageDao;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        VehicleModule,
        ConfigModule.registerAsync({
          type: Application.API,
          env: Environment.DEV,
        }),
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return {
              uri: uri,
            };
          },
        }),
      ],
    }).compile();

    controller = moduleRef.get<VehicleController>(VehicleController);
    dao = moduleRef.get<VehicleMessageDao>(VehicleMessageDao);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('should return one vehicle', async () => {
      jest
        .spyOn(dao, 'find')
        .mockImplementation(() => Promise.resolve(findResponseLimitOne));

      const findArgs = plainToClass(FindVehicleMessageDto, { limit: 1 });
      const result = await controller.find(findArgs);

      expect(result).toEqual({
        data: findResponseLimitOne,
        paging: findPaging,
      });
    });

    it('should request 20 vehicles because no limit was passed', async () => {
      jest
        .spyOn(dao, 'find')
        .mockImplementation(() => Promise.resolve(findResponseLimitSeveral));

      const findArgs = plainToClass(FindVehicleMessageDto, {});
      const result = await controller.find(findArgs);

      expect(findArgs).toEqual({
        limit: 20,
        offset: 0,
        sort: {
          date: -1,
        },
      });
      expect(result).toEqual({
        data: findResponseLimitSeveral,
        paging: { ...findPaging, limit: 20 },
      });
    });

    it('should fail if wrong parameters were passed', async () => {
      /**
       * TODO: proper error type should be used
       */
      jest
        .spyOn(dao, 'find')
        .mockImplementation(() =>
          Promise.resolve(findResponseValidationFailed as any),
        );

      const result = await controller.find({
        limit: 'string',
      } as unknown as FindVehicleMessageDto);

      expect(result).toEqual({
        data: findResponseValidationFailed,
        paging: {
          limit: 'string',
          offset: undefined,
          total: 0,
        },
      });
    });
  });

  describe('findById', () => {
    it('should not return message if id is wrong', async () => {
      jest
        .spyOn(dao, 'findById')
        .mockImplementation(() =>
          Promise.resolve(findResponseValidationFailed as any),
        );

      const result = await controller.findById(new FindVehicleByIdDto());

      expect(result).toEqual(findResponseValidationFailed);
    });

    it('should return one message by id', async () => {
      jest
        .spyOn(dao, 'findById')
        .mockImplementation(() => Promise.resolve(findByIdResponse as any));

      const findArgs = plainToClass(FindVehicleByIdDto, {
        id: '630252a69ad52a353567cb14',
      });
      const result = await controller.findById(findArgs);

      expect(result).toEqual(findByIdResponse);
    });
  });
});
