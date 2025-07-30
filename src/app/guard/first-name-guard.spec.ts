import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firstNameGuard } from '../first-name-guard';

describe('firstNameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstNameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
