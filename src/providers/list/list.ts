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
    'Hello \n\n Bello'
  ]

  constructor(public http: HttpClient) {
    console.log('Hello ListProvider Provider');
  }

  public getLists(){
    return this.items;
  }

  public addItem( item ){
    this.items.push( item );
  }

  public deleteItem( itemIndex ){
    this.items.splice( itemIndex, 1); //remove from todos
  }

}
