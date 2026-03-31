import { TestBed } from '@angular/core/testing';

import { TipoArticuloService } from './tipo-articulo.service';

describe('TipoArticuloService', () => {
  let service: TipoArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
