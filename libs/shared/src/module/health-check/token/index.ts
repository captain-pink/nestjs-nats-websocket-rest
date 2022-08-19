import { Inject } from '@nestjs/common';

export const INJECTION_TOKEN_HEALTH_CHECK = 'HEALTH_CHECK';

export function InjectHealthCheck() {
  return Inject(INJECTION_TOKEN_HEALTH_CHECK);
}
