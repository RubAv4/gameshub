import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Juego } from '../../interfaces/juego.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { JuegosDataService } from '../../services/juegos-data.service';
import { CategoriasService } from '../../services/categorias.service';
import { TarjetaJuegoComponent } from '../tarjeta-juego/tarjeta-juego.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, TarjetaJuegoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  juegosPopulares$!: Observable<Juego[]>;
  juegosRecientes$!: Observable<Juego[]>;
  categoriasPrincipales$!: Observable<Categoria[]>;
  totalJuegos$!: Observable<number>;
  
  estadisticas = {
    jugadoresActivos: '150M+',
    juegosDisponibles: '500+',
    torneos: '1.2K',
    premios: '$50M'
  };
  
  constructor(
    private juegosService: JuegosDataService,
    private categoriasService: CategoriasService
  ) {}
  
  ngOnInit(): void {
    this.juegosPopulares$ = this.juegosService.obtenerJuegosPopulares(6);
    this.juegosRecientes$ = this.juegosService.obtenerJuegosRecientes(3);
    this.categoriasPrincipales$ = this.categoriasService.obtenerCategoriasPrincipales();
  }
}