import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Juego } from '../../interfaces/juego.interface';
import { JuegosDataService } from '../../services/juegos-data.service';

@Component({
  selector: 'app-detalle-juego',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-juego.component.html',
  styleUrl: './detalle-juego.component.css'
})
export class DetalleJuegoComponent implements OnInit {
  juego$!: Observable<Juego | undefined>;
  juegosSimilares$!: Observable<Juego[]>;
  
  tabActiva = 'info';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private juegosService: JuegosDataService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.juego$ = this.juegosService.obtenerJuegoPorId(id);
        
        // Obtener juegos similares
        this.juego$.subscribe(juego => {
          if (juego) {
            this.juegosSimilares$ = this.juegosService.filtrarPorCategoria(juego.categoria);
          }
        });
      }
    });
  }
  
  volver(): void {
    this.router.navigate(['/juegos']);
  }
  
  cambiarTab(tab: string): void {
    this.tabActiva = tab;
  }
  
  obtenerEstrellas(rating: number): number[] {
    const estrellas = Math.floor(rating);
    return Array(5).fill(0).map((_, i) => i < estrellas ? 1 : 0);
  }
  
  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}