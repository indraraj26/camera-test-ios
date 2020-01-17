import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Platform } from '@ionic/angular';

declare const window: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private camera: Camera, private _base64: Base64, private _platform: Platform) { }
  
  openCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let newImage = imageData;
     if(this._platform.is('ios')) {
        newImage = newImage.replace(/^file:\/\//, '')
      }
     let base64 = await this.readAsBase64(newImage)
     console.log(base64, "base64 string base64")
     
    }, (err) => {
     // Handle error
    });
  }

  secondCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const ogPath = window.Ionic.WebView.convertFileSrc(imageData);
     console.log("ogPath", ogPath)
    //  let base64 = await this.readAsBase64(ogPath)
    //  console.log(base64, "base64 with ionic webview converFileSrc2")
    }, (err) => {
     // Handle error
    });
  }

  thirdCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     console.log(window.Ionic.WebView.convertFileSrc(imageData), 'Og Path')
     const ogPath = window.Ionic.WebView.convertFileSrc(imageData)
     this._base64.encodeFile(ogPath).then((data: string) => {
       console.log("base64 encoding", data)
     }).catch(e => console.log('base 64 encoding errror', e))
    }, (err) => {
     // Handle error
    });
  }

  private async readAsBase64(cameraPhoto: any) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
