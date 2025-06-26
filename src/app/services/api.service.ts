
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Servicio para interactuar con la API de Dog CEO.
 * Proporciona métodos para obtener información sobre razas de perros y sus imágenes.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private AWS_API_URL = environment.AWS_API_URL;

  /**
   * Crea una instancia del servicio ApiService.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de todas las razas de perros disponibles en la API.
   * @returns {Observable<any>} - Observable que emite la lista de razas de perros.
   */
  obtenerListaRaza(): Observable<any> {
    return this.http.get(`${this.baseUrl}breeds/list/all`);
  }

  /**
   * Obtiene una imagen aleatoria de un perro.
   * @returns {Observable<any>} - Observable que emite una imagen aleatoria de perro.
   */
  obtenerImagenRandom(): Observable<any> {
    return this.http.get(`${this.baseUrl}breeds/image/random`);
  }

  /**
   * Obtiene una imagen aleatoria de una raza específica.
   * @param {string} raza - Nombre de la raza de perro.
   * @returns {Observable<any>} - Observable que emite una imagen aleatoria de la raza especificada.
   */
  
  obtenerImagenPorRaza(raza: string): Observable<any> {
    return this.http.get(`${this.baseUrl}breed/${raza}/images/random`);
  }

  //implementación para AWS proyect
  guardarFavorito(favorito: { userId: string; dogName: string }): Observable<any> {
  return this.http.post(`${this.AWS_API_URL}favoritos`, favorito);
}
}
