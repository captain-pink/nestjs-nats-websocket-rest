import {
  Application,
  Environment,
  MongoVariables,
  NatsVariables,
} from '../enum';

export type Variables = MongoVariables | NatsVariables;

export type ConfigModuleOptions = {
  type: Application;
  env: Environment;
};

export type MongoConfig = {
  username: string;
  password: string;
  host: string;
  port: string;
  db: string;
};

export type LoaderConfig = {
  host: string;
  protocol: string;
  port: number;
  transport: string;
  name: string;
};

export type ApiConfig = {
  name: string;
  host: string;
  port: number;
};

export interface CommonConfig {
  mongo: MongoConfig;
  loader: LoaderConfig;
  api: ApiConfig;
}
