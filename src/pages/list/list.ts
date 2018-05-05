import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ToastController, Header  } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import jQuery from "jquery";
import { ListProvider } from '../../providers/list/list';

import { HTTP } from '@ionic-native/http';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  //attribute to us throughout the code
  public items = [];
  public getWord;
  

  constructor(public http: HTTP, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private listProvider: ListProvider) {
  }



  ionViewDidLoad(){

    this.items = this.listProvider.getLists(); //loads the list of default card for users to see

  }

  callAPI(word){ 
    let getWord;
    var encodedUrl = encodeURIComponent(word); //changes the word to go into the link properly

    //setting up post for miniontranslate API
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

    //runs the API
    jQuery.when( jQuery.ajax( settings ) ).done(function( response ) {
      console.log("Respnse: " + response);
      //grabs the translated part of the api
      console.log(response.contents.translated);
      getWord = response.contents.translated;

    });
    console.log(getWord);
    return getWord; //returns the translated word to the card
  }

  //pop up for adding in a english to minion word
  openListAlert () {
    //opens the window
    let addListAlert = this.alertCtrl.create({
      //what is displayed
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
            let itemText = inputData.addListInput; //grabs input
            //sends the inputed word and the translation to the card
            this.listProvider.addItem( itemText + " \n\n " + this.callAPI(itemText));//+ "\n" + this.word);
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

  //deletes the selected area
  public deleteItem( itemIndex ){
    this.items.splice( itemIndex, 1); //remove from todos
  }

}
