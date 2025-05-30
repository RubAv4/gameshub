export interface Juego {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  desarrollador: string;
  fechaLanzamiento: string;
  descripcion: string;
  rating: number;
  plataformas: string[];
  precio: number;
  esGratis: boolean;
  requisitos: {
    minimos: {
      os: string;
      procesador: string;
      memoria: string;
      graficos: string;
      almacenamiento: string;
    };
    recomendados: {
      os: string;
      procesador: string;
      memoria: string;
      graficos: string;
      almacenamiento: string;
    };
  };
  screenshots: string[];
  trailer?: string;
  tags: string[];
}