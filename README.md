# VEHICLE-OBSERVER

## Change log version 0.0.1 -> 0.1.0

- Generic analytic module introduced -> <b>libs/shared/src/module/analytic</b>. Analytic module uses WorkerNodes library under the hood to introduce concept of the WorkerPool. As Node is single threaded and aimed for frequent "light" io/crud operations, heavy computations (with huge dataframes) can load event loop and clients may see significant increase of latency. Of course, module is still very basic and should be improved (as mostly everything in the project). I suggest using something more appropriate for the case like Python pandas or Rust Polars.

- Vehicles analytic module introduced -> <b>apps/loader/src/analytic/vehicle</b>.
Vechiles analytic module inherit generic analytic module. To process analytic reports, it uses workerNodes instance. To handle logic it demands processor which is places here (apps/loader/src/analytic/vehicle/analytic-worker.processor.ts). Any processor's method accept 3 parameters:

```
  action: VehicleAnalyticProcessorAction (processor method)
  field: keyof VehicleMessage (VehicleMessages mongo keys)
  payload: AbstractAnalyticActionPayload<Array<Record<string, any>>> (includes dataframe, can be extended with additional parameters)
```

After calculations returns:
```
{
  action: A (generic action)
  field: string (field to process, e.g. speed, energy...)
  timings: Timeframe (start and end time tot measure performance)
  result: R (generic result)
}
```

- Ws lib was changed to Socket.io to add simplified event support.
Please refer <b>Websocket API</b> for how to (was updated).

- TS configuration was change to use workers with nestjs.

- Updated env.example files.

- Small fixes across different modules applied.

## Description

Current repository shows how technical task "ViriCiti Nodejs Assignment" can be solved in elegant and extensible way using Node and NestJS framework. Monorepo concept applied as well to prevent of using different node_modules folders and to simplify project building process.

## Stack

- Nodejs 16+;
- NestJs 9;
- Ws;
- Axios;
- Mongoose;
- ramda (no overhead with functional approach, just used to simplify some calculations);
- Docker & Docker-compose;

## Structure

Project consist of 2 apps and 1 library (and separate repository with telegram bot).

### Library

- modules (config, mongo, health-check, analytic) - all modules are built to use across monorepo.
- util - solves some atomic issues

### Apps
- Loader application - load data to mongodb, serve it across WS protocol;
- Api - simple rest api application to get data from mongo

### Testing

Because of "solid" project structure which was established from scratch, there are lack of unit tests, but examples can be find here:
- apps/api/src/vehicle/_test (shows example of controller's unit testing)
- libs/config/_test (helper tested)

Of course, coverage is very low, but any tests can be written by request (unit, intergration). The reason of such coverage is a lack of time.

## Usage

1. clone the repository
2. Create .env folder and plase env files there (check .env.example)
3. Install Docker & Docker-compose
4. Navigate to root folder
5. Run docker-compose up -d
6. Check /health endpoint of services
7. Publish messages to nats with subject "vehicle.*"

## API

- /health endpoint accessible for both - loader and api service.
- /vehicles, /vehicles/:id endpoints - api service

## Websocket API
Runs on port <b>1000</b> - hardcoded, but will be moved to config.

Currently Websocket API has 3 events:
- VEHICLES - send by server for each socket once vehicles is created in mongodb (legacy, should be change to socket.io event and should be send only for listeners);
- FAILED - send by server for each socket if vehicle creation has failed (legacy, needs to be adjusted to socket.io);
- ANALYSE - send by client to get analytics in response (in postman should be added to Acknowledgement).
Check input example:

```
{ "command": "average.speed", "timeframe": { "start": 1511436343000, "end": 1511436447000 }}
```

<b>command</b> - consist of 2 parts:
1. analytic method to apply
2. parameter to analyse
pattern can be extended in future, for example for we can measure battery level depending on speed (km/h) or depending on time (in sec/min/...); In this case, it is offered to add third part - "by"

<b>timeframe</b> - everything is simple. from where to start and up to which time to measure. It would be nice to add support for different time formats. We should use UTC time.

Available analytic methods:
- mean, median, average, max, min - use with <b>speed</b>, <b>soc</b>, <b>enerygy</b> (The rest parameters also will work, but there is no matter to use them. So We need to add validation);
- subtract - use with <b>odo</b> and <b>soc</b>;
- would be nice to add some maps api and charts;

As a testing client tool postman was used.
Please refer to: https://blog.postman.com/postman-now-supports-socket-io/

## Telegram bot api consummer

In order to implement fast alerting, messenger APIs can be used. To play with it, one more repository was created (https://github.com/captain-pink/rust-telegram-api-consumer).

## How do I see the future of this project (If we suppose that this one is live)

- [x] To change WS to socket.io in case we want to improve server failover or we have clients with legacy browsers;
- [ ] Extend unit tests converage at least up to 75-80%;
- [ ] Accelerate docker build (adjust configuration);
- [ ] To add some lib for security checks (e.g. snyk)
- [ ] To add husky hooks (e.g. linter/prettier - precommit, tests/security - prepush)
- [ ] To set up monitoring with some tool (e.g. AWS cloud watch + Kinesis + New Relic/graphana/kibana);
- [ ] To set up alerting (tool dependent);
- [ ] Optimise Docker build for different envs (remove all dev deps for prod, etc);
- [ ] Implement module for custom metrics collection (tool dependent);
- [ ] Would be nice to implement custom logger service (NestJS uses console under the hood, pino or winston better);
- [ ] Secrets to store on cloud (e.g. AWS secret manager);
- [ ] To add swagger/typedoc;
- [ ] Fix all todos across the application;


## Time spent ~ 16h
