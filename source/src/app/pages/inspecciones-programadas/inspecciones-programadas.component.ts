import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';
// import { FormButton } from '../../../models/form-button';
import { CollapseOptions } from '../../../models/collapse-options';
import { MenuItem } from '../../../models/menu-item';
import { TableFiltered } from '../../../models/table-filtered';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ConfigPagination } from '../../../models/config-pagination';
import { ValidadorService } from '../../../services/validador.service';
import { SessionService } from '../../../services/session.service';
import { FormButton } from 'src/models/form-button';

@Component({
  selector: 'app-inspecciones-programadas',
  templateUrl: './inspecciones-programadas.component.html',
  styleUrls: ['./inspecciones-programadas.component.css'],
  providers: [ValidadorService, SessionService]
})
export class InspeccionesProgramadasComponent extends BasePageComponent implements OnInit {
  public collapseOptions: CollapseOptions;
  public config: ConfigPagination;
  public menus: any;
  public params: any;
  public errorsForm: any;
  public comportamiento: any[];
  public id: string;
  public errors: any;
  public comportamientoForm: any;
  public registro: any;
  loading: boolean;
  disabledFields: any[];
  cols: TableFiltered[];
  columnas: any[];
  newMenu: boolean;
  menu: any = {};
  selectedRegistro: any;
  tituloDialog: string;
  displayDialog: boolean;
  multipleSelectionMenu: MenuItem[];
  onRowExpand: any;
  unselectAllRows = false;
  selectedItems: any;
  items: MenuItem[];

  public RegistrosPorPagina = 5;
  public Menu: any;
  public msgs: string;
  public selectedEstado: any;
  public errorMessage: any;
  public error: any;
  public confirmado;
  public camposBusqueda: any;
  public totalRecords: number;
  brands: any[];
  colors: any[];
  yearFilter: number;
  yearTimeout: any;
  result: any;
  page: any;
  calificaciones: any[];
  objetivos: any[];
  actionButtons: FormButton[];
  buttons: FormButton[];
  enabledMultipleSelection = false;

  constructor(
    private validadorService: ValidadorService,
    private messageService: MessageService,
    private session: SessionService,
    private router: Router) {
    super(messageService);
  }

  ngOnInit() {
    this.loading = true;
    this.setForm();

    this.collapseOptions = {
      hidden: true,
      disabled: false
    };

    /*this.items = [
      { label: 'Editar', icon: 'pi pi-pencil', command: (event) => this.editarRegistro() },
      { label: 'Borrar Menu', icon: 'pi pi-times', command: (event) => this.borrarMenu() }
    ];*/

    // setTimeout(() => {
    this.disabledFields = ['estado_menu_evaluacion', 'comentarios', 'objectivo', 'definicion_objetivo'];

    const configCalendar = {};

    /***********configuro la tabla******************/
    this.config = {
      /*****registro por pagina *************/
      rowsPerPage: 5,
      allowGlobalSearch: false,
      allowServerSide: false
    };

    this.cols = [
      {
        header: 'id',
        field: 'id',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'id',
        allowFiltered: false,
        required: false,
        // pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'number',
        disabled: true
      },
      {
        header: 'Dependencia',
        field: 'dependencia',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Dependencia',
        allowFiltered: true,
        required: true,
        // pattern: '^[a-zA-Z0-9 áéíóúÑñ]{2,80}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'Área',
        field: 'area',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Área',
        allowFiltered: true,
        required: true,
        // pattern: '^[a-zA-Z0-9/áéíóúÑñ]{5,80}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'Fecha Plan.',
        field: 'fecPlanificada',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Fecha Planificada',
        allowFiltered: true,
        required: true,
        // pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'Motivo',
        field: 'motivo',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Motivo',
        allowFiltered: true,
        required: true,
        //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'Calle/Altura',
        field: 'calleAltura',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Calle/Altura',
        allowFiltered: true,
        required: true,
        //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'Piso/Dpto./Local',
        field: 'pisoDptoLocal',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Piso/Dpto./Local',
        allowFiltered: true,
        required: true,
        //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'CUIT',
        field: 'cuit',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'CUIT',
        allowFiltered: true,
        required: true,
        //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'R.Social',
        field: 'rSocial',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'inputl',
        placeHolder: 'Razón Social',
        allowFiltered: true,
        required: true,
        //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      },
      {
        header: 'Requisitos',
        field: 'requisitos',
        class: 'ui-g-12',
        classPadre: 'ui-g-12',
        input: 'input',
        placeHolder: 'Requisitos',
        allowFiltered: true,
        required: true,
        //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
        type: 'string',
        disabled: false
      }
    ];

    this.columnas = this.cols;

    this.loading = true;

    /*this.buttons = [
      {
        class: 'ui-button-success',
        icon: 'fa fa-close',
        label: 'Guardar',
        disabled: false,
        execute: this.save.bind(this)
      }
    ];*/

    /*this.actionButtons = [
      {
        class: '',
        icon: 'fa fa-plus',
        label: 'Agregar',
        disabled: false,
        execute: this.showDialogToAdd.bind(this)
      }
    ];*/

    this.Consulta();

    this.loading = false;
  }

  Consulta() {
    this.menus = [
      {
        id: 1,
        parent_id: null,
        dependencia: 'DGFyC',
        area: 'SGO Inspecciones simples',
        fecPlanificada: '29/11/2019',
        motivo: 'Analizar Documentación',
        calleAltura: 'CORRIENTES AV. 3201',
        pisoDptoLocal: 'Local 4',
        cuit: '30-71038609-7',
        rSocial: 'Prueba 1',
        links: []
      },
      {
        id: 2,
        parent_id: null,
        dependencia: 'DGFyC',
        area: 'Auditorias Integrales Programadas',
        fecPlanificada: '07/12/2019',
        motivo: 'Inspección AIP',
        calleAltura: 'CORRIENTES AV. 3201',
        pisoDptoLocal: 'Piso 2 - Dpto D',
        cuit: '28-23772215-9',
        rSocial: 'Prueba 2',
        links: []
      },
      {
        id: 3,
        parent_id: null,
        dependencia: 'DGFyC',
        area: 'Auditorias Integrales Programadas',
        fecPlanificada: '07/12/2019',
        motivo: 'Inspección AIP',
        calleAltura: 'CORRIENTES AV. 3201',
        pisoDptoLocal: 'Piso 7 - Dpto B',
        cuit: '28-23572215-9',
        rSocial: 'Prueba 3',
        links: []
      },
      {
        id: 4,
        parent_id: null,
        dependencia: 'DGFyC',
        area: 'Auditorias Integrales Programadas',
        fecPlanificada: '08/12/2019',
        motivo: 'Inspección AIP',
        calleAltura: 'CORRIENTES AV. 3201',
        pisoDptoLocal: 'Piso 5 - Dpto B',
        cuit: '28-23773215-9',
        rSocial: 'Prueba 4',
        links: []
      },
      {
        id: 5,
        parent_id: null,
        dependencia: 'DGFyC',
        area: 'Auditorias Integrales Programadas',
        fecPlanificada: '09/12/2019',
        motivo: 'Inspección AIP',
        calleAltura: 'CORRIENTES AV. 3201',
        pisoDptoLocal: 'Piso 4 - Dpto B',
        cuit: '28-23772515-9',
        rSocial: 'Prueba 5',
        links: []
      },
      {
        id: 6,
        parent_id: null,
        dependencia: 'DGFyC',
        area: 'Auditorias Integrales Programadas',
        fecPlanificada: '10/12/2019',
        motivo: 'Inspección AIP',
        calleAltura: 'CORRIENTES AV. 3201',
        pisoDptoLocal: 'Piso 2 - Dpto A',
        cuit: '28-23722215-9',
        rSocial: 'Prueba 6',
        links: []
      }
    ];
  }

  ConsultaServer(event) {
    let page = 0;

    if (event.first > 0) {
      page = event.first / event.rows;
    }

    let sort = '';
    let orden = '';

    if (event.sortField && event.sortField !== '') {
      event.sortField = this.toCamelCase(event.sortField);

      if (event.sortOrder === 1) {
        orden = 'asc';
      } else {
        orden = 'desc';
      }

      const campo = this.cols.find(campob => campob.field === event.sortField);

      if (campo && campo.type === 'object' && campo.metodo && campo.metodo !== '') {
        sort = event.sortField + '.' + campo.metodo + ',' + orden;
      } else {
        sort = event.sortField + ',' + orden;
      }
    } else {
      sort = 'id,asc';
    }

    const params = {
      sort,
      size: event.rows,
      page
    };

    this.params = params;

    let index;

    // tslint:disable-next-line: forin
    for (index in event.filters) {
      params[index] = event.filters[index].value;
    }
    // this.Consulta(params);
  }

  onHide() {
    this.emptyErrors();
  }

  emptyErrors() {
    this.errorsForm = [];
    this.comportamiento = [];

    this.cols.forEach(campo => {
      const dat = {
        valid: true,
        message: ''
      };

      this.errorsForm[campo.field] = dat;
    });
  }

  /*getDataFromCol(index, cols) {
    let camp = {};

    const campo = {};

    // tslint:disable-next-line: no-shadowed-variable
    cols.forEach((campo: { field?: any; }) => {
      if (index === campo.field) {
        camp = campo;
      }
    });

    return camp;
  }

  getDescripcionFromId() {
    let descripcion = '';

    this.menus.forEach(campo => {
      if (this.id === campo.id) {
        descripcion = campo.descripcion;
      }
    });

    return descripcion;
  }*/

  showDialogToAdd() {
    this.errors = [];
    this.setForm(1);
    this.newMenu = true;
    this.menu = {};
    this.menu.activo = true;
    this.tituloDialog = 'Alta Menu';
    this.displayDialog = true;
  }

  getErrores() {
    let c = 1;
    let str = '<ul>';
    this.errors.forEach(mensaje => {

      str += mensaje + '<br>';
      c++;
    });

    return str;
  }

  mostrarErrores() {
    let c = 1;
    this.errors.forEach(mensaje => {
      let index;

      // tslint:disable-next-line: forin
      for (index in this.columnas) {
        this.columnas[c].error = true;
        this.columnas[c].mensaje = mensaje;
      }
      c++;
    });
  }

  /*altaMenu(Menu) {
  }*/

  refresh() {
    this.Consulta();
  }

  onRowSelect(event) {
  }

  editarRegistro() {
    this.errors = [];

    // habilito todos los campos para la modificacion
    this.newMenu = false;

    //bajos los estados disponibles para un id de menu
    this.menu = this.cloneEvaluacion(this.selectedRegistro);
    this.comportamiento = [];
    this.tituloDialog = 'Editar Menu';
    this.displayDialog = true;
    setTimeout(() => {}, 1000);
  }

  onRowMenuSelect(event) {
    this.registro = event.data;
    this.id = event.data.id;
  }

  getYear(fecha) {
    if (fecha instanceof Date) {
      return fecha.getFullYear();
    } else {
      return fecha;
    }
  }

  cloneEvaluacion(c: any):
    any {
    const menuEvaluacion = {};

    // tslint:disable-next-line: forin
    for (const prop in c) {
      menuEvaluacion[prop] = c[prop];
    }

    return menuEvaluacion;
  }

  convertToString(estado) {
    if (typeof estado === 'object') {
      return estado.value;
    }
    return estado;
  }

  guardaMenu(Menu: { id: any; }) {
    const params = {
      menuAltaDto: Menu,
      id: Menu.id
    };
  }

  /*save(menu) {
    if (this.validadorService.validarCampos(menu, this.columnas) === true) {
      if (this.newMenu === false) {
        this.guardaMenu(menu);
      } else {
        this.altaMenu(menu);
      }
    } else {
      this.errorsForm = this.validadorService.getErrorForm();
      this.showError('Error en la carga de datos ', '');
    }
  }*/

  // add textarea for next objectives
  addObjective(event, data = '') {
    if (this.comportamientoForm.comportamientos.data.length < this.comportamientoForm.comportamientos.max) {
      // extend array definiciones
      this.comportamientoForm.comportamientos.data.push(data);
    }
  }

  isMinusDisabled() {
    if (this.comportamientoForm.comportamientos.data.length > this.comportamientoForm.comportamientos.min) {
      return false;
    } else {
      return true;
    }
  }

  isAddDisabled() {
    if (this.comportamientoForm.comportamientos.data.length < this.comportamientoForm.comportamientos.max) {
      return false;
    } else {
      return true;
    }
  }

  removeObjective(event) {
    if (this.comportamientoForm.comportamientos.data.length > this.comportamientoForm.comportamientos.min) {
      this.comportamientoForm.comportamientos.data.splice(-1, 1);
    }
  }

  setForm(min = 0) {
    this.comportamientoForm = {};
    this.comportamientoForm.comportamientos = [];

    if (this.comportamientoForm.comportamientos) {
      this.comportamientoForm.comportamientos.min = 1;
      this.comportamientoForm.comportamientos.max = 3;
      if (!this.comportamientoForm.comportamientos.data || !this.comportamientoForm.comportamientos.data.length) {
        this.comportamientoForm.comportamientos.data = _.fill(Array(min), '');
      }
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  borrarMenu() {
    const id = this.selectedRegistro.id;

    if (id && id !== '0') {
    }
  }

  mostrarGrilla(event: Event) {
    const divBuscar = document.getElementById('dataTableContainer');

    divBuscar.style.display = 'block';
  }
}
