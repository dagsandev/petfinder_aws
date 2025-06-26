import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {

  favoritos: any[] = [];

  constructor() {}

  ngOnInit() {
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      this.favoritos = JSON.parse(favoritosGuardados);
    }
  }

  eliminarFavorito(index: number) {
  this.favoritos.splice(index, 1); // Elimina el perro del array
  localStorage.setItem('favoritos', JSON.stringify(this.favoritos)); // Actualiza el storage
}

}
