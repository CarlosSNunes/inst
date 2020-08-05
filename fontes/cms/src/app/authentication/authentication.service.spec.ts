import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('remove token', () => {
    const service = new AuthenticationService();
    service.state = null;
    expect(service.state).toBeNull();
  });

  it('set token', () => {
    const service = new AuthenticationService();
    service.state = new UserAuthenticateModel({ perfis: [] });
    expect(service.state).not.toBeNull();
  });

  it('retrive token', () => {
    const service = new AuthenticationService();
    service.state = new UserAuthenticateModel({ perfis: [] });
    expect(service.retrieveToken()).not.toBeNull();
  });
});
