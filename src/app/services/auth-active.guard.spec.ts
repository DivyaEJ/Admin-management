import { TestBed } from '@angular/core/testing';

import { AuthActiveGuard } from './auth-active.guard';

describe('AuthActiveGuard', () => {
  let guard: AuthActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
