import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaJuegoComponent } from './tarjeta-juego.component';

describe('TarjetaJuegoComponent', () => {
  let component: TarjetaJuegoComponent;
  let fixture: ComponentFixture<TarjetaJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
