// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { datosRazas } from '../services/datosRaza';
import { ModalController } from '@ionic/angular';
import { CrearPublicacionModalComponent } from '../crear-publicacion-modal/crear-publicacion-modal.component';

const imagenPorDefecto = './assets/iStock-518012153.jpg'; // Ruta de tu imagen por defecto local

/**
 * Componente para la página de Adopción, mostrando publicaciones y selector de razas.
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  razasPerros: any[] = [];
  filteredRazasPerros: any[] = [];
  selectedBreedName: string | null = null;
  selectedBreedDetails: any | null = null;
  showBreedSelection: boolean = false;

  publicaciones: any[] = []; // Todas las publicaciones
  displayedPublicaciones: any[] = []; // Publicaciones actualmente visibles
  // initialVisiblePosts: number = 3; // No longer needed for this approach
  // postsIncrement: number = 2; // No longer needed for this approach
  // hasMorePosts: boolean = false; // No longer needed for this approach

  currentIndex: number = 0; // Nuevo: rastrea el índice de la primera publicación visible
  postsPerPage: number = 3; // Nuevo: número de publicaciones a mostrar por "página"

  constructor(private apiService: ApiService, private modalController: ModalController) {}

  ngOnInit() {
    this.razasPerros = datosRazas;
    this.filteredRazasPerros = [...datosRazas];

    // Cargar datos de publicaciones (simulados)
    this.loadDummyPublicaciones();
    this.updateDisplayedPublicaciones(); // Cargar las publicaciones iniciales

    // Obtiene la imagen de cada raza desde la API
    this.razasPerros.forEach((perro) => {
      let breedNameForApi = perro.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s/g, '');

      switch (breedNameForApi) {
        case 'pastoraleman': breedNameForApi = 'germanshepherd'; break;
        case 'bulldoginglés': breedNameForApi = 'bulldog'; break;
        case 'bulldogfrancés': breedNameForApi = 'bulldog-french'; break;
        case 'grandanés': breedNameForApi = 'dane-great'; break;
        case 'setterirlandés': breedNameForApi = 'setter-irish'; break;
        case 'cotóndetulear': breedNameForApi = 'cotondetulear'; break;
        case 'mastín': breedNameForApi = 'mastiff'; break;
        case 'bichónfrisé': breedNameForApi = 'bichon'; break;
        case 'xoloitzcuintli': breedNameForApi = 'mexicanhairless'; break;
        case 'sanbernardo': breedNameForApi = 'stbernard'; break;
        case 'greyhounditaliano': breedNameForApi = 'italiangreyhound'; break;
        case 'greyhoundindio': breedNameForApi = 'greyhound'; break;
        case 'australiankelpie': breedNameForApi = 'kelpie'; break;
        case 'australianshepherd': breedNameForApi = 'australian-shepherd'; break;
        case 'cattledogaustraliano': breedNameForApi = 'cattledog-australian'; break;
        case 'danishswedish': breedNameForApi = 'danish-swedish-farmdog'; break;
        case 'deerhoundescocés': breedNameForApi = 'deerhound-scottish'; break;
        case 'elkhoundnoruego': breedNameForApi = 'elkhound-norwegian'; break;
        case 'lapphundfinés': breedNameForApi = 'lapphund-finnish'; break;
        case 'buhundnoruego': breedNameForApi = 'buhund-norwegian'; break;
        case 'bullterrierstaffordshire': breedNameForApi = 'bullterrier-staffordshire'; break;
        case 'corgicardigan': breedNameForApi = 'corgi-cardigan'; break;
        case 'terranova': breedNameForApi = 'newfoundland'; break;
      }

      this.apiService.obtenerImagenPorRaza(breedNameForApi).subscribe(
        (data) => {
          if (data && data.message) {
            perro.imagen = data.message;
          } else {
            console.warn('API no devolvió una URL de imagen válida para', perro.nombre, data);
            perro.imagen = imagenPorDefecto;
          }
        },
        (error: any) => {
          console.error('Error al obtener imagen para la raza', perro.nombre, error);
          perro.imagen = imagenPorDefecto;
        }
      );
    });
  }

  // Carga datos de publicaciones simuladas
  loadDummyPublicaciones() {
    this.publicaciones = [
      { id: 1, titulo: 'Cachorro Beagle en Adopción', descripcion: 'Beagle muy juguetón y cariñoso busca un hogar.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-26' },
      { id: 2, titulo: 'Perro Adulto, Mestizo', descripcion: 'Mestizo de 3 años, tranquilo y apto para familia.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-25' },
      { id: 3, titulo: 'Pomerania Rescatado', descripcion: 'Pomerania hembra, 1 año, muy activa. Ideal para personas con tiempo.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-24' },
      { id: 4, titulo: 'Labrador Retriever Amigable', descripcion: 'Labrador macho, 2 años, excelente con niños y otras mascotas.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-23' },
      { id: 5, titulo: 'Pastor Alemán Necesita Hogar', descripcion: 'Pastor Alemán macho, protector, necesita espacio y entrenamiento.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-22' },
      { id: 6, titulo: 'Dálmata Joven', descripcion: 'Dálmata hembra, 1.5 años, con mucha energía. Ideal para deportistas.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-21' },
      { id: 7, titulo: 'Bulldog Francés Cariñoso', descripcion: 'Bulldog Francés de 1 año, muy afectuoso y sociable. Perfecto para vivir en apartamento.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-20' },
      { id: 8, titulo: 'Golden Retriever Energético', descripcion: 'Golden Retriever de 2 años, adora los paseos y los juegos. Compatible con niños.', imagen: '../assets/iStock-518012153.jpg', fecha: '2023-10-19' },
      { id: 9, titulo: 'Husky Siberiano, Macho', descripcion: 'Husky de 3 años, necesita mucha actividad física. Ideal para climas fríos.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-18' },
      { id: 10, titulo: 'Chihuahua Tímido', descripcion: 'Chihuahua hembra de 4 años, un poco asustadiza al principio, pero muy leal.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-17' },
      { id: 11, titulo: 'Border Collie Inteligente', descripcion: 'Border Collie de 1.5 años, muy inteligente y obediente. Busca familia activa.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-16' },
      { id: 12, titulo: 'Rottweiler Grande y Bueno', descripcion: 'Rottweiler macho de 2.5 años, bien socializado y protector. Requiere dueño experimentado.', imagen: './assets/iStock-518012153.jpg', fecha: '2023-10-15' },
    ];
  }

  // --- NUEVOS MÉTODOS PARA NAVEGACIÓN ---

  // Actualiza las publicaciones mostradas según el currentIndex
  updateDisplayedPublicaciones(): void {
    const startIndex = this.currentIndex;
    const endIndex = this.currentIndex + this.postsPerPage;
    this.displayedPublicaciones = this.publicaciones.slice(startIndex, endIndex);
  }

  // Mueve a la siguiente "página" de publicaciones
  nextPosts(): void {
    if (this.currentIndex + this.postsPerPage < this.publicaciones.length) {
      this.currentIndex += this.postsPerPage;
      this.updateDisplayedPublicaciones();
    }
  }

  // Mueve a la "página" anterior de publicaciones
  prevPosts(): void {
    if (this.currentIndex > 0) {
      this.currentIndex = Math.max(0, this.currentIndex - this.postsPerPage);
      this.updateDisplayedPublicaciones();
    }
  }

  // Verifica si hay publicaciones anteriores disponibles
  hasPrev(): boolean {
    return this.currentIndex > 0;
  }

  // Verifica si hay publicaciones siguientes disponibles
  hasNext(): boolean {
    return this.currentIndex + this.postsPerPage < this.publicaciones.length;
  }

  // --- MÉTODOS EXISTENTES (algunos eliminados/modificados) ---

  // loadDisplayedPublicaciones, loadMorePosts, hasMorePosts ya no son necesarios
  // pues se reemplazan por updateDisplayedPublicaciones, nextPosts, prevPosts, hasPrev, hasNext

  onBreedSelectChange(event: any): void {
    const breedName = event.detail.value;
    this.selectedBreedName = breedName;

    if (breedName) {
      this.selectedBreedDetails = this.razasPerros.find(raza => raza.nombre === breedName);
      this.showBreedSelection = false;
    } else {
      this.selectedBreedDetails = null;
      this.filteredRazasPerros = [...this.razasPerros];
      this.showBreedSelection = false;
    }
  }

  toggleBreedSelection(): void {
    this.showBreedSelection = !this.showBreedSelection;

    if (this.showBreedSelection) {
      this.selectedBreedDetails = null;
      this.selectedBreedName = null;
      this.filteredRazasPerros = [...this.razasPerros];
    }
  }

  /**
   * Abre el modal para crear una nueva publicación de adopción.
   */
  async openCreatePostModal() {
    const modal = await this.modalController.create({
      component: CrearPublicacionModalComponent,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Datos recibidos al cerrar el modal (onDidDismiss):', data);
    
    if (data && data.nuevaPublicacion) {
      console.log('Nueva publicación detectada en data.nuevaPublicacion:', data.nuevaPublicacion);
      this.publicaciones.unshift(data.nuevaPublicacion); // Añadir al principio
      this.currentIndex = 0; // Reiniciar para ver la nueva publicación al principio
      this.updateDisplayedPublicaciones(); // Actualizar las mostradas
    } else {
      console.log('Modal cerrado sin nueva publicación o formato inesperado. Objeto data:', data);
    }
  }
}