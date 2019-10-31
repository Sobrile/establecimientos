import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { DialogViewColumn } from '../../../models/dialog-view-column';
import { FormButton } from '../../../models/form-button';

@Component({
  selector: 'app-view-info-dialog',
  templateUrl: './view-info-dialog.component.html',
  styleUrls: ['./view-info-dialog.component.css']
})
export class ViewInfoDialogComponent implements OnInit  {

  lodash = _;

  @Input() dialogTitle: string;
  public es:any;

  @Input() displayDialog: boolean;
  @Output() displayDialogChange = new EventEmitter();

  @Input() fields: DialogViewColumn[];

  @Input() buttons: FormButton[];

  @Input() elementToShow: any;

  chunks: any;

  colWidth: string[] = ["4","2"];

  constructor() { }

  ngOnInit() {
  }

  onHide(){
    this.displayDialogChange.emit(this.displayDialog)
  }

}
