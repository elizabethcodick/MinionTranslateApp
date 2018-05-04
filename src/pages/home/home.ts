import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import jQuery from "jquery";
import { HTTP } from '@ionic-native/http';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public text;

  constructor(private nativeAudio: NativeAudio, public http: HTTP, public navCtrl: NavController) {

  }

  public playMusic(){
    //	API key: a30a43335c5840f3b187c4e2232041c7
    let url = "http://ganskop.com/proxy/http://api.voicerss.org/?key=a30a43335c5840f3b187c4e2232041c7&hl=en-us&src=Hello Lizzie";
    console.log("test the code");
    this.http.get( url, {}, {} )
    .then( response => {
      console.log( "Response: ", response );

      this.nativeAudio.preloadSimple('play', url);//.then(onSuccess, onError);

      //this.nativeAudio.play('uniqueId1').then(onSuccess, onError);
      this.nativeAudio.play( 'play' );
      this.nativeAudio.unload('play');
    })
    .catch(error =>{
    console.log( error );
    });
    
}

}
