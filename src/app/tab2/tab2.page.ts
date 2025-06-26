// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { datosRazas } from '../services/datosRaza';

const imagenPorDefecto = './assets/iStock-518012153.jpg';

/**
 * Componente para mostrar la lista de razas de perros.
 * Permite expandir cada raza para mostrar información adicional.
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  razasPerros: any[] = []; // Lista de razas de perros
  expandedItem: string | null = null; // Almacena el nombre del elemento expandido

  /**
   * Crea una instancia de Tab2Page.
   * @param {ApiService} apiService - Servicio para obtener datos de la API.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Aquí se obtienen las imágenes de las razas de perros.
   */
  ngOnInit() {
    this.razasPerros = datosRazas;

    // Obtiene la imagen de cada raza desde la API
    this.razasPerros.forEach((perro) => {
      this.apiService.obtenerImagenPorRaza(perro.nombre.toLowerCase()).subscribe(
        (data) => {
          perro.imagen = data.message; // Asegúrate de que 'message' es la propiedad correcta
        },
        (error) => {
          console.error('Error al obtener imagen para la raza', perro.nombre, error);
          perro.imagen = imagenPorDefecto;
        }
      );
    });
  }

  agregarAFavoritos(perro: any) {
  const favorito = { userId: 'usuario123', dogName: perro.nombre, imagen: perro.imagen };

  this.apiService.guardarFavorito(favorito).subscribe({
    next: () => {
      alert('Perro favorito guardado!');

      // Guardar localmente
      let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      favoritos.push(favorito);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    },
    error: (err) => {
      console.error('Error al guardar favorito:', err);
      alert('Error al guardar favorito');
    },
  });
}



}
