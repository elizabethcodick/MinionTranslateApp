import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ToastController, Header  } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import jQuery from "jquery";
import { ListProvider } from '../../providers/list/list';

import { HTTP } from '@ionic-native/http';
//import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public items = [];
  public text;
  public transWord = [];
  public getWord;
  

  constructor(public http: HTTP, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private listProvider: ListProvider) {
  }



  ionViewDidLoad(){

    this.items = this.listProvider.getLists();

  }

  public fun(word): void{
    this.getWord = word;
    console.log("get word: " + this.getWord);
  }

  public word(): string{
    return this.getWord;
  }

  callAPI(word){ 
    let getWord;
    var encodedUrl = encodeURIComponent(word);

    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://minion.p.mashape.com/minion.json?text=" + word,
      "method": "POST",
      "headers": {
        "X-Mashape-Key": "Mc9ZEnuivJmshTtpYYW89JsSKKCkp1jhE04jsnP6dgM6uohXTH",
        "Cache-Control": "no-cache",
        "Postman-Token": "f9b33cea-d410-48fd-9d91-6471e0edb608"
      }
    }
    var strWord;
    // jQuery.ajax(settings).done(function (response) {
    //   console.log(response);
    // });

    jQuery.when( jQuery.ajax( settings ) ).done(function( response ) {
      console.log("Respnse: " + response);

      console.log(response.contents.translated);
      getWord = response.contents.translated;

    });
    console.log(getWord);
    return getWord;
  }

  openListAlert () {
    let addListAlert = this.alertCtrl.create({
      title: "Add a Word",
      message: "Enter a word",
      inputs: [{
          type: "text",
          name: "addListInput"
      }],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Word",
          handler: inputData => {
            let itemText = inputData.addListInput;
            console.log(itemText);
            //this.callAPI(itemText);
            console.log("text: ");
            this.listProvider.addItem( itemText + " \n\n " + this.callAPI(itemText));//+ "\n" + this.word);
            console.log("After calls ");
            addListAlert.onDidDismiss( () => {  //annonymous function
                let addListToast = this.toast.create({  //config object
                    message: "Word added",
                    duration: 2000 //200 millisec
                });
                addListToast.present();
            });
          }
        }
      ]
    });

    //show alert
    addListAlert.present();
  }

  public deleteItem( itemIndex ){
    this.items.splice( itemIndex, 1); //remove from todos
  }

}
