import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, combineLatest } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';
import { JuegosDataService } from './juegos-data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
  public categorias$ = this.categoriasSubject.asObservable();

  constructor(
    private http: HttpClient,
    private juegosService: JuegosDataService
  ) {
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.http.get<{ categorias: Categoria[] }>('assets/data/juegos.json')
      .subscribe(data => {
        this.categoriasSubject.next(data.categorias);
      });
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.categorias$;
  }

  obtenerCategoriaPorId(id: string): Observable<Categoria | undefined> {
    return this.categorias$.pipe(
      map(categorias => categorias.find(categoria => categoria.id === id))
    );
  }

  obtenerCategoriasConContador(): Observable<Array<Categoria & { contador: number }>> {
    return combineLatest([
      this.categorias$,
      this.juegosService.juegos$
    ]).pipe(
      map(([categorias, juegos]) => 
        categorias.map(categoria => ({
          ...categoria,
          contador: juegos.filter(juego => 
            juego.categoria.toLowerCase() === categoria.nombre.toLowerCase()
          ).length
        }))
      )
    );
  }

  obtenerCategoriasPrincipales(): Observable<Categoria[]> {
    return this.categorias$.pipe(
      map(categorias => categorias.slice(0, 4))
    );
  }
}