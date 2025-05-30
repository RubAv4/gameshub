import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaJuegosComponent } from './components/lista-juegos/lista-juegos.component';
import { DetalleJuegoComponent } from './components/detalle-juego/detalle-juego.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'juegos', component: ListaJuegosComponent },
  { path: 'juego/:id', component: DetalleJuegoComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categoria/:id', component: ListaJuegosComponent },
  { path: 'estadisticas',component: EstadisticasComponent},
  { path: 'estadisticas/id',component: EstadisticasComponent},
  { path: '**', redirectTo: '' }
  
];