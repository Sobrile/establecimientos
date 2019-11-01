import {Component, OnInit, Input, Output, EventEmitter, Pipe, ViewChild, SimpleChanges} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {DatePipe} from '@angular/common';
import * as _ from 'lodash';
import {Table} from 'primeng/table';
import {FormButton} from '../../../models/form-button';
import {CollapseOptions} from '../../../models/collapse-options';
import {MenuItem} from '../../../models/menu-item';
import {ConfigPagination} from '../../../models/config-pagination';

@Pipe({
  name: 'customDateFormat',
})


@Component({
  selector: 'app-table-filtered',
  templateUrl: './table-filtered.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  styleUrls: ['./table-filtered.component.css']
})
export class TableFilteredComponent implements OnInit {
  lodash = _;
  @Input() rows: any[];
  // on left click, the selected row
  @Input() selectedRow: any[];
  @Output() selectedRowChange = new EventEmitter();
  // table columns
  @Input() cols: any[];
  // lazy load
  @Input() loading: boolean;
  // pagination
  @Input() configPagination: ConfigPagination;
  @Input() onRowExpand: Function;
  // page actions
  @Input() onRowSelect: Function;
  @Input() onRowMenuSelect: Function;
  @Input() onLazyLoad: Function;
  // allow menu and contextual
  @Input() allowMenuOnRow: boolean; // allow 3 dots on right column
  @Input() itemsRightMenu: MenuItem[];
  @Output() expandedRowChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataKey: any;
  @Input() actionButtons: FormButton[];
  @Input() collapseOptions: CollapseOptions;
  @Input() expandedRow: any;
  @Output() onMenuToggle: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dt') tableFiltered: Table;
  @Input() collapseAllRows: boolean;
  // icon and title to expand row
  @Input() iconExpand: string;
  @Input() expandTitle: string;
  // enable or disabled row style
  // this function return a class string depending data row value
  @Input() appendClassInRow: Function;
  // if true, it enables the multiple selection mode
  @Input() selectionMultipleMode: boolean = false;
  @Input() multipleSelectionMenu: MenuItem[];
  @Input() unselectAllRows: boolean = false;
  @Input() selectAllRows = false;
  @Output() selectAllRowsChange = new EventEmitter();
  row: any;
  visibleBackdrop: boolean = false;

  constructor() {
  }

  ngOnInit() {
    // background black
    this.visibleBackdrop = false;
  }

  loadData(event) {
    this.onLazyLoad(event);
  }

  rowSelect(event) {
    this.onRowSelect(event);
    this.selectedRowChange.emit(this.selectedRow);
  }

  rowMenuSelect(event) {
    if (this.onRowMenuSelect) {
      this.onRowMenuSelect(event);
      this.selectedRowChange.emit(this.selectedRow);
    }
  }

  rowExpand(event) {
    this.expandedRow = event.data;
    if (this.expandedRowChange) {
      this.expandedRowChange.emit(event);
    }
  }

  printData(dat, col) {
    var data = dat[col.field];
    var dataSub = dat[col.campoData];
    if (data != null || dataSub != null) {
      switch (col.type) {
        case "date":
          var datePipe = new DatePipe("en-US");
          return datePipe.transform(data, 'dd/MM/yyyy');
          break;
        case "object":
          return data[col.metodo]
          break;
        case "subcampo":
          var res = ""
          if (typeof dataSub != "undefined" && col.subcampo && col.subcampo != "" && dataSub.length > 0) {
            if (col.campoPrint && col.campoPrint != "") {
              dataSub.forEach(reg => {
                if (this.elementExist(reg, col.subcampo)
                  && this.elementExist(reg[col.subcampo], "id")
                  && reg[col.subcampo].id == col.idsubcampo) {
                  res = reg[col.campoPrint];
                }
              })
            }
          }

          return res
          break;
        case "razonsocial":
          var res = ""
          if (typeof dataSub != "undefined" && col.subcampo && col.subcampo != "" && dataSub.length > 0) {
            if (col.campoPrint && col.campoPrint != "") {
              dataSub.forEach(reg => {
                if (this.elementExist(reg, col.subcampo) && this.elementExist(reg, col.field)
                  && this.elementExist(reg[col.subcampo], "id")
                  && reg[col.subcampo].id == col.idsubcampo) {
                  res = reg[col.field].nombre_fantasia;
                }
              })
            }
          }

          return res
          break;
        case "smp":
          var res = ""
          console.log("altura ",data)
          if (typeof data == "object" && data.length > 0) {
            data.forEach(altura => {
              console.log("altura ",altura)
              if (altura.principal) {
                  if (typeof altura.smp==="object") {
                    res = altura.smp.seccion + "-" + altura.smp.manzana + "-" + altura.smp.parcela;
                  }

              }
            })
          }
          break;
        case "array":
          var res = ""
          if (typeof data == "object" && data.length > 0) {
            data.forEach(dat => {
              if (dat[col.campoFiltro] == col.valorCampoFiltro) {
                if (col.campoPrint && col.campoPrint != "" && typeof col.campoPrint == "string") {
                  var fields = col.campoPrint.split(",");
                  if (typeof fields == "object" && fields.length > 1) {
                    fields.forEach(reg => {
                      res += dat[reg] + " ";
                    })
                  } else {
                    res = dat[col.campoPrint];
                  }
                }

              }
            })

          }
          return res
          break;

        case "calleyaltura":
          if (typeof data == "object" && data.length > 0) {
            data.forEach(altura => {
              if (altura.principal) {
                if (altura.normalizado == true) {
                  res = altura.calle_normalizada + " " + altura.altura_normalizada;
                } else {
                  res = altura.calle + " " + altura.altura;
                }
              }
            })
          }
          return res
          break;
        case "pisodeptolocal":
          if (typeof data == "object" && data.length > 0) {
            data.forEach(altura => {
              if (altura.principal) {
                res = altura.piso + " " + altura.dpto + " " + altura.local;
              }
            })
          }
          return res
          break;
        case "array2":
          var res = ""

          if (typeof data == "object" && data.length > 0) {
            data.forEach(dat => {

              if (col.campoPrint && col.campoPrint != "" && typeof col.campoPrint == "string") {
                var fields = col.campoPrint.split(",");
                if (typeof fields == "object" && fields.length > 1) {
                  fields.forEach(reg => {
                    res += dat[reg] + " ";
                  })
                } else {
                  var subfields = col.campoPrint.split('.');
                  if (typeof subfields == "object" && subfields.length > 1) {
                    if (this.elementExist(dat[col.subcampo], subfields[0])) {
                      res = this.printElement(dat[col.subcampo], col.campoPrint);
                    }
                  } else {
                    res = dat[col.subcampo][col.campoPrint];
                  }
                }
              }


            })

          }
          return res
          break;
        case "boolean":
          if (data == "true" || data == true) {
            return "Sí";
          } else {
            return "No";
          }
          break;
        default:
          return data;
      }
    }
  }

  printElement(Array, search) {
    var asearch = search.split('.');
    for (let key of _.keys(Array)) {
      if (asearch[0] == key) {
        if (typeof Array[key] === "object") {
          for (let key2 of _.keys(Array[key])) {
            if (asearch[1] == key2) {
              return Array[key][key2];
            }
          }
        }
      }
    }
  }

  elementExist(Array, search) {
    for (let key of _.keys(Array)) {
      if (search === key) {
        return true;
      }
    }
    return false;
  }

  togglerIsDisabled(rowData) {
    if (this.collapseOptions.disableRow) {
      return this.collapseOptions.disableRow(rowData) || this.collapseOptions.disabled;
    } else {
      return this.collapseOptions.disabled;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.collapseAllRows) {
      this.collapseEvaluacionActive();
    }
    this.changeSelectionMode(changes);
    // if selectAllRows now is true and before was false
    this.selectAll(changes);
  }

  protected changeSelectionMode(changes) {

    if (changes.selectionMultipleMode
      && changes.selectionMultipleMode.previousValue != changes.selectionMultipleMode.currentValue) {
      this.tableFiltered.selection = [];
      this.unselectAllRows = false;
    }

  }

  protected selectAll(changes) {

    if (this.selectionMultipleMode
      && changes.selectAllRows
      && changes.selectAllRows.currentValue
      && !changes.selectAllRows.previousValue) {

      this.tableFiltered.selection = this.tableFiltered.value;

      // fix to select multiple times the multiple selection
      const _this = this;
      setTimeout(function () {
        _this.selectAllRows = false;
        _this.selectAllRowsChange.emit(_this.selectAllRows);
        _this.selectedRowChange.emit(_this.tableFiltered.value);
      }, 100);

    }
  }

  collapseEvaluacionActive() {
    this.tableFiltered.expandedRowKeys = {};
    this.collapseAllRows = false;
    // to remove backdrop
    this.toggleRow(null, false);
  }

  // executed when press expand button
  onClickExpandButton(event, row) {
    event.stopPropagation();

    this.toggleRow(row, !this.visibleBackdrop);
  }

  // executed when press expand button or when collapseAll is true
  // only for put black background and highlight the evalucion
  toggleRow(row, collapse) {

    this.visibleBackdrop = collapse;

    // if row exists remove z-index and unset from component
    if (this.row) {
      this.row.classList.remove("evaluacionRow");
      this.row = null;
    }
    // if comes a new row, set on the component attribute
    if (row) {
      row.classList.add("evaluacionRow");
      this.row = row;
    }

  }

  menuToggle(event, menu, data) {

    this.onMenuToggle.emit(data);
    this.selectedRow = data;
    this.selectedRowChange.emit(this.selectedRow);
    menu.toggle(event)
  }

  menuMultipleSelectionToggle(event, menu) {
    menu.toggle(event);
  }

}
