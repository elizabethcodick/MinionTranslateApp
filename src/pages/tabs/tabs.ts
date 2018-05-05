import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //links the pages to the tabs at the bottom of the page
  tab1Root = HomePage;
  tab2Root = ListPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
