import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListProvider {
  private items = [ 
    //starter example of a sort of note card for the word in eng and minion
    'Hello \n\n Bello'
  ]

  constructor(public http: HttpClient) {
    console.log('Hello ListProvider Provider');
  }

  //gets the whole list
  public getLists(){
    return this.items;
  }

  //adds an item to the list
  public addItem( item ){
    this.items.push( item );
  }

  //deletes that current item
  public deleteItem( itemIndex ){
    this.items.splice( itemIndex, 1); //remove from todos
  }

}
