export interface Chollo {
  id: number;
  titulo: string;
  tienda: string;
  precio: number;
  precioAntes: number;
}

export const chollos: Chollo[] = [
  { id: 1, titulo: 'Menú del día', tienda: 'Bar de la Plaza', precio: 9.5, precioAntes: 12 },
  { id: 2, titulo: 'Docena de huevos camperos', tienda: 'Granja local', precio: 2.2, precioAntes: 3 },
  { id: 3, titulo: 'Corte de pelo', tienda: 'Peluquería Centro', precio: 8, precioAntes: 12 },
   { id: 4, titulo: 'Kilo de tomates', tienda: 'Frutería El Huerto', precio: 1.5, precioAntes: 2.2 },
];