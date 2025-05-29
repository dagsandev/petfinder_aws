import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
//import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';

/**
 * Componente de la pestaña 3.
 * Permite al usuario cambiar su foto de perfil y cerrar sesión.
 * 
 * @component
 */
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  /**
   * Almacena los datos del usuario autenticado.
   * @type {any}
   */
  userData: any = {};

  /**
   * Instancia del almacenamiento de Firebase.
   * @type {Storage}
   */
  //storage = getStorage();

  /**
   * Crea una instancia del componente Tab3Page.
   * 
   * @param {AuthService} authService - Servicio de autenticación para manejar los datos del usuario.
   * @param {Router} router - Router de Angular para la navegación entre páginas.
   * @param {Auth} auth - Autenticación de Firebase para manejar el estado del usuario.
   * @param {ActionSheetController} actionSheetController - Controlador para mostrar un Action Sheet al usuario.
   */
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
    private actionSheetController: ActionSheetController // Inyectar ActionSheetController
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Verifica el estado de autenticación del usuario y carga los datos del usuario si está autenticado.
   * 
   * @async
   * @function
   * @returns {void}
   */
  async ngOnInit() {
    // Usar el observable de autenticación de Cognito
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        this.userData = this.oidcSecurityService.getUserData(); // Datos del usuario desde Cognito
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Presenta un Action Sheet para que el usuario seleccione una opción para cambiar su foto de perfil.
   * 
   * @async
   * @function
   * @returns {void}
   */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar foto de perfil',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera',
          handler: () => this.takePhoto()
        },
        {
          text: 'Seleccionar desde Galería',
          icon: 'image',
          handler: () => this.selectFromGallery()
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  /*
  HAY QUE IMPLEMENTAR LA CAMARA DESDE EL SERVICIO
  */
  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90
      });

      if (photo.dataUrl) {
        const file = await this.dataUrlToFile(photo.dataUrl, 'profile.jpg');
        //await this.uploadFile(file);
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }

  /**
   * Permite al usuario seleccionar una imagen desde la galería y la sube a Firebase Storage.
   * 
   * @async
   * @function
   * @returns {void}
   */
  async selectFromGallery() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        quality: 90
      });

      if (photo.dataUrl) {
        const file = await this.dataUrlToFile(photo.dataUrl, 'profile.jpg');
        //await this.uploadFile(file);
      }
    } catch (error) {
      console.error("Error al seleccionar la foto:", error);
    }
  }

  /**
   * Convierte una cadena de datos en formato Data URL a un objeto File.
   * 
   * @param {string} dataUrl - La cadena Data URL que representa la imagen.
   * @param {string} filename - El nombre que se le asignará al archivo.
   * @returns {Promise<File>} - Promesa que resuelve el objeto File.
   */
  async dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/jpeg' });
  }

//TODO
//******para carga de archivos podemos usar AWS Amplify******
//// Instala AWS Amplify
// npm install aws-amplify @aws-amplify/storage
// 
// import { Storage } from 'aws-amplify';

// async uploadFile(file: File) {
//   try {
//     const result = await Storage.put(`profile_pictures/${Date.now()}.jpg`, file, {
//       contentType: 'image/jpeg',
//     });
//     const downloadURL = await Storage.get(result.key);
//     this.userData.foto = downloadURL;
//   } catch (error) {
//     console.error("Error al subir la imagen:", error);
//   }
// }


  /**
   * Sube un archivo de imagen a Firebase Storage y actualiza la foto de perfil del usuario en la base de datos.
   * 
   * @param {File} file - Archivo de imagen a subir.
   * @returns {Promise<void>} - Promesa que se resuelve cuando la imagen se ha subido y el perfil ha sido actualizado.
   */
  // async uploadFile(file: File) {
  //   if (file && this.auth.currentUser) {
  //     const filePath = `profile_pictures/${this.auth.currentUser.uid}`;
  //     const fileRef = ref(this.storage, filePath);

  //     try {
  //       await uploadBytes(fileRef, file);
  //       const downloadURL = await getDownloadURL(fileRef);
  //       //await this.authService.updateUserProfilePicture(this.auth.currentUser.uid, downloadURL);
  //       this.userData.foto = downloadURL;
  //     } catch (error) {
  //       console.error("Error al subir la imagen:", error);
  //     }
  //   }
  // }

  /**
   * Cierra la sesión del usuario actual y redirige a la página de login.
   * 
   * @async
   * @function
   * @returns {void}
   */
 async logout() {
  this.oidcSecurityService.logoff().subscribe(() => {
    this.router.navigate(['/login']);
  });
}
}
