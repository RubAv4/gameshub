import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  categoriasConContador$!: Observable<Array<Categoria & { contador: number }>>;
  
  constructor(private categoriasService: CategoriasService) {}
  
  ngOnInit(): void {
    this.categoriasConContador$ = this.categoriasService.obtenerCategoriasConContador();
  }
}