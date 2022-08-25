import { Application, Environment } from '../../enum';
import { chooseEnvPath } from '../../helper/choose-env-path.helper';

describe('chooseEnvPath', () => {
  it('should successfully construct path', () => {
    const path = chooseEnvPath(Application.API, Environment.DEV);

    expect(path.includes('.env/.dev.api')).toBeTruthy();
  });

  it('should fail if no params passed', () => {
    try {
      chooseEnvPath(null, null);
    } catch (error) {
      expect(error.message).toBe('No type or env was passed');
    }
  });
});
