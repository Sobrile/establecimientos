import { Component, OnInit } from '@angular/core';
import { VERSION } from '../../../environments/version';
import { GLOBALS } from '../../../environments/globals';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.css'],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  version = VERSION;
  value=""
  loading:boolean;
  globals = GLOBALS;
  constructor(

  ) { }

  ngOnInit() {



  }

}
