# VEHICLE-OBSERVER

## Description

Current repository shows how technical task "ViriCiti Nodejs Assignment" can be solved in elegant and extensible way using NestJs framework and Node. Monorepo concept applied as well to prevent of using different node_modules folders and to simplify project building.

## Stack
- Nodejs 16+;
- NestJs 9;
- Ws;
- Axios;
- Mongoose;
- ramda (no overhead with functional approach, just used to simplify some calculations);
- Docker & Docker-compose;

## Structure

Project consist of 2 apps and 1 library.

### Library
- modules (config, mongo, health-check) - all modules are built to use across monorepo.
- util - solves some atomic issues

### Apps
- Loader application - load data to mongodb, serve it across WS protocol;
- Api - simple rest api application to get data from mongo

### Testing

Because of "solid" project structure which was established from scratch, there are lack of unit tests, but examples can be find here:
- apps/api/src/vehicle/_test (shows example of controller's unit testing)
- libs/config/_test (helper tested)

Of course, coverage is very low, but any tests can be written by request (unit, intergration). The reason of such coverage is a lack of time.

## How do I see the future of this project (If we suppose that this one is live)

- To add some lib for security checks (e.g. snyk)
- To add husky hooks (e.g. linter/prettier - precommit, tests/security - prepush)
- To set up monitoring with some tool (e.g. AWS cloud watch + Kinesis + New Relic/graphana/kibana);
- To set up alerting (tool dependent);
- Implement module for custom metrics collection (tool dependent);
- Would be nice to implement custom logger service (NestJS uses console under the hood, pino or winston better);
- Secrets to store on cloud (e.g. AWS secret manager);
- To change WS to socket.io in case we want to improve server failover or we have clients with legacy browsers;
- To add swagger/typedoc;
- Fix all todos across the application;


## Time spent ~ 10h
