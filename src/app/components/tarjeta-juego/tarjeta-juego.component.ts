import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';

@Component({
  selector: 'app-tarjeta-juego',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tarjeta-juego.component.html',
  styleUrl: './tarjeta-juego.component.css'
})
export class TarjetaJuegoComponent {
  @Input() juego!: Juego;
  
  obtenerEstrellas(): number[] {
    const estrellas = Math.floor(this.juego.rating);
    return Array(5).fill(0).map((_, i) => i < estrellas ? 1 : 0);
  }
}