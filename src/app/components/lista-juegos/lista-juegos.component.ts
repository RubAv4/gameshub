import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { Juego } from '../../interfaces/juego.interface';
import { JuegosDataService } from '../../services/juegos-data.service';
import { TarjetaJuegoComponent } from '../tarjeta-juego/tarjeta-juego.component';
import { FiltrosComponent } from '../filtros/filtros.component';

@Component({
  selector: 'app-lista-juegos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TarjetaJuegoComponent, FiltrosComponent],
  templateUrl: './lista-juegos.component.html',
  styleUrl: './lista-juegos.component.css'
})
export class ListaJuegosComponent implements OnInit {
  juegos$!: Observable<Juego[]>;
  juegosFiltrados$!: Observable<Juego[]>;
  
  private filtrosSubject = new BehaviorSubject<any>({
    busqueda: '',
    categoria: '',
    plataforma: '',
    precio: '',
    rating: 0
  });
  
  filtros$ = this.filtrosSubject.asObservable();
  terminoBusqueda = '';
  categoriaSeleccionada = '';
  mostrandoResultados = 0;
  
  constructor(
    private juegosService: JuegosDataService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.juegos$ = this.juegosService.obtenerJuegos();
    
    // Verificar si viene de una categoría específica
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoriaSeleccionada = params['id'];
        this.actualizarFiltros();
      }
    });
    
    // Combinar juegos con filtros
    this.juegosFiltrados$ = combineLatest([
      this.juegos$,
      this.filtros$
    ]).pipe(
      map(([juegos, filtros]) => {
        let resultado = juegos;
        
        // Filtro por búsqueda
        if (filtros.busqueda) {
          resultado = resultado.filter(juego =>
            juego.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            juego.desarrollador.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            juego.categoria.toLowerCase().includes(filtros.busqueda.toLowerCase())
          );
        }
        
        // Filtro por categoría
        if (filtros.categoria) {
          resultado = resultado.filter(juego =>
            juego.categoria.toLowerCase() === filtros.categoria.toLowerCase()
          );
        }
        
        // Filtro por plataforma
        if (filtros.plataforma) {
          resultado = resultado.filter(juego =>
            juego.plataformas.includes(filtros.plataforma)
          );
        }
        
        // Filtro por precio
        if (filtros.precio === 'gratis') {
          resultado = resultado.filter(juego => juego.esGratis);
        } else if (filtros.precio === 'pago') {
          resultado = resultado.filter(juego => !juego.esGratis);
        }
        
        // Filtro por rating
        if (filtros.rating > 0) {
          resultado = resultado.filter(juego => juego.rating >= filtros.rating);
        }
        
        this.mostrandoResultados = resultado.length;
        return resultado;
      })
    );
  }
  
  buscar(): void {
    this.actualizarFiltros();
  }
  
  onFiltrosChange(filtros: any): void {
    this.filtrosSubject.next({
      ...this.filtrosSubject.value,
      ...filtros
    });
  }
  
  limpiarFiltros(): void {
    this.terminoBusqueda = '';
    this.categoriaSeleccionada = '';
    this.filtrosSubject.next({
      busqueda: '',
      categoria: '',
      plataforma: '',
      precio: '',
      rating: 0
    });
  }
  
  private actualizarFiltros(): void {
    this.filtrosSubject.next({
      ...this.filtrosSubject.value,
      busqueda: this.terminoBusqueda,
      categoria: this.categoriaSeleccionada
    });
  }
}