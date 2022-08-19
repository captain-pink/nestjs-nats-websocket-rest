import { registerAs } from '@nestjs/config';

import { Application, MongoVariables, NatsVariables } from '../enum';
import { VariablePrefix } from '../enum/variable-prefix.enum';
import { INJECTION_TOKEN_CONFIG } from '../token';
import { makeEnumAsVariablesParser } from '../../../util/make-enum-as-variables.util';

/**
 * Creates config based on applicaton which is used
 * TODO: Can be separated by different injection tokens
 * @param type application runtime
 * @returns project configuration
 */
export function makeConfigFactory(type: Application) {
  return registerAs(INJECTION_TOKEN_CONFIG, () => {
    const commonVariables = { mongo: parseMongoVariables() };

    if (type === Application.API) {
      return { ...commonVariables, api: parseApiConfig() };
    }

    if (type === Application.LOADER) {
      return { ...commonVariables, loader: parseLoaderConfig() };
    }

    return commonVariables;
  });
}

function parseMongoVariables() {
  const mongoPrefix = VariablePrefix[VariablePrefix.MONGO];
  const enumAsVariablesParser = makeEnumAsVariablesParser(mongoPrefix);

  return enumAsVariablesParser(MongoVariables);
}

function parseLoaderConfig() {
  const mongoPrefix = VariablePrefix[VariablePrefix.NATS];
  const enumAsVariablesParser = makeEnumAsVariablesParser(mongoPrefix);

  return enumAsVariablesParser(NatsVariables);
}

function parseApiConfig() {
  return {};
}
