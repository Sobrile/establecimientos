import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grilla-view',
  templateUrl: './grilla-view.component.html',
  styleUrls: ['./grilla-view.component.css']
})
export class GrillaViewComponent implements OnInit {
  @Input() reglasHead: any;
  @Input() accionesHead: any;
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
  }

}
