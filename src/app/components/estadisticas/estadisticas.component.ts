import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosDataService } from '../../services/juegos-data.service';
import { Juego } from '../../interfaces/juego.interface';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit {
  juegos: Juego[] = [];
  totalJuegos: number = 0;
  juegosGratis: number = 0;
  juegosPago: number = 0;
  mejorJuego: Juego | null = null;
  promedioPrecio: number = 0;

  constructor(private juegosService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosService.obtenerJuegos().subscribe((data: Juego[]) => {
      this.juegos = data;
      this.totalJuegos = data.length;
      this.juegosGratis = data.filter(j => j.precio === 0).length;
      this.juegosPago = data.filter(j => j.precio > 0).length;
      this.mejorJuego = data.reduce((prev, curr) => (curr.rating > prev.rating ? curr : prev), data[0]);
      const precios = data.filter(j => j.precio > 0).map(j => j.precio);
      this.promedioPrecio = precios.reduce((acc, val) => acc + val, 0) / precios.length;
    });
  }
}

/* 
4.1
respuesta pregunta 1: juego.interface.ts
respuesta pregunta 2: juegos-data.service.ts
respuesta pregunta 3: app.config.ts

*/

/* 4.2
respuesta pregunta 1:el proyecto usa componentes standalone que permiten obviar de NgModules y trabajar con una configuración mas simple y modular

respuesta pregunta 2:mantener y compartir el estado de los juegos en toda la aplicacion de forma reactiva emitiendo los datos mas recientes a todos los suscriptores sin necesidad de volver a hacer la peticion HTTP */