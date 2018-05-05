import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import jQuery from "jquery";
import { HTTP } from '@ionic-native/http';
import { NativeAudio } from '@ionic-native/native-audio';
import { Media, MediaObject } from '@ionic-native/media';
import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public text;
  public playSpeech: MediaObject;
  public myInput = "";
  public myOutput = "";

  constructor(private nativeAudio: NativeAudio, public http: HTTP, public navCtrl: NavController) {

  }

  //grabs the users input and adds the translation the the other text box
  public translate() {
    var outWord;
    var encodedUrl = encodeURIComponent(this.myInput); //changes it to match the link

    //opening a post call for the minion translate
    var settings = {
      "async": false, //waits to continue
      "crossDomain": true,
      "url": "https://minion.p.mashape.com/minion.json?text=" + this.myInput,
      "method": "POST",
      "headers": {
        "X-Mashape-Key": "Mc9ZEnuivJmshTtpYYW89JsSKKCkp1jhE04jsnP6dgM6uohXTH",
        "Cache-Control": "no-cache",
        "Postman-Token": "f9b33cea-d410-48fd-9d91-6471e0edb608"
      }
    }
    jQuery.when( jQuery.ajax( settings ) ).done(function( response ) {
      //grabs translation
      outWord = response.contents.translated;
    });
    console.log(outWord);
    this.myOutput = outWord; //adds the translated word to the other textarea
  }

  //voices the text in to second textarea -- output
  public voice() {
    //	API key: a30a43335c5840f3b187c4e2232041c7

    //opening a post call for the text to speech api
    let url = "http://ganskop.com/proxy/http://api.voicerss.org/?key=a30a43335c5840f3b187c4e2232041c7&hl=en-us&src=Bello"; //+ this.myOutput;
    console.log("test the code");
    this.http.get( url, {}, {} )
    .then( response => {
      console.log( "Response: ", response );

      //plays the voice outloud
      this.nativeAudio.preloadSimple('play', url);//.then(onSuccess, onError);

      //this.nativeAudio.play('uniqueId1').then(onSuccess, onError);
      this.nativeAudio.play( 'play' );
      this.playSpeech.play();
      this.nativeAudio.unload('play');
    })
    .catch(error =>{
    console.log( error );
    });
  }

}
