import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  @Output() filtrosChange = new EventEmitter<any>();
  
  categorias = [
    { id: 'battle-royale', nombre: 'Battle Royale' },
    { id: 'sandbox', nombre: 'Sandbox' },
    { id: 'moba', nombre: 'MOBA' },
    { id: 'fps', nombre: 'FPS' },
    { id: 'rpg', nombre: 'RPG' },
    { id: 'sports', nombre: 'Sports' }
  ];
  
  plataformas = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'];
  
  filtros = {
    categoria: '',
    plataforma: '',
    precio: '',
    rating: 0
  };
  
  onFiltroChange(): void {
    this.filtrosChange.emit(this.filtros);
  }
  
  onCategoriaChange(categoria: string): void {
    this.filtros.categoria = this.filtros.categoria === categoria ? '' : categoria;
    this.onFiltroChange();
  }
  
  onPlataformaChange(plataforma: string): void {
    this.filtros.plataforma = this.filtros.plataforma === plataforma ? '' : plataforma;
    this.onFiltroChange();
  }
  
  onPrecioChange(precio: string): void {
    this.filtros.precio = this.filtros.precio === precio ? '' : precio;
    this.onFiltroChange();
  }
  
  onRatingChange(rating: number): void {
    this.filtros.rating = this.filtros.rating === rating ? 0 : rating;
    this.onFiltroChange();
  }
}