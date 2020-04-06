import { async, TestBed } from '@angular/core/testing';
import { AlandaUiModule } from './alanda-ui.module';

describe('AlandaUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AlandaUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AlandaUiModule).toBeDefined();
  });
});
