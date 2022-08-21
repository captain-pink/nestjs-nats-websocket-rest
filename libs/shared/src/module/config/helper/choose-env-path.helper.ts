import { join, resolve } from 'path';
import { isNil } from 'ramda';

import { Application, Environment } from '../enum';

/**
 * Calculates env file path
 * TODO: rewrite hardcoded relative path logic to dynamic
 * @param type Type of application is used
 * @param env Environment runtime type
 * @returns path to file as string
 */
export function chooseEnvPath(type: Application, env: Environment): string {
  if (isNil(type) || isNil(env)) {
    throw new Error('No type or env was passed');
  }

  const application = Application[type].toLowerCase();
  const environment = Environment[env].toLowerCase();

  const projectPath = resolve(__dirname);
  const relatedEnvPath = `/../../../.env/.${environment}.${application}`;

  return join(projectPath, relatedEnvPath);
}
