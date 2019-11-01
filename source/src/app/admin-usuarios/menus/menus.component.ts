import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import {MessageService} from 'primeng/components/common/messageservice';
import {FormButton} from '../../../models/form-button';
import {CollapseOptions} from '../../../models/collapse-options';
import {MenuItem} from '../../../models/menu-item';
import {TableFiltered} from '../../../models/table-filtered';
import {BasePageComponent} from '../../components/base-page/base-page.component';
import {ConfigPagination} from '../../../models/config-pagination';
import {MenuService} from '../../../services/menu.service';
import {ValidadorService} from '../../../services/validador.service';
import {SessionService} from '../../../services/session.service';


@Component({
    selector: 'app-menus',
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.css'],
    providers: [MenuService, ValidadorService,SessionService]
})
export class MenusComponent extends BasePageComponent implements OnInit {
    buttons: FormButton[];
    actionButtons: FormButton[];
    public registro: any;
    public menus: any;
    public Menu: any;
    public msgs: string;
    cols: TableFiltered[];
    columnas: any[];
    brands: any[];
    colors: any[];
    yearFilter: number;
    public comportamiento: any[];
    yearTimeout: any;
    onRowExpand: any;
    selectedItems: any;
    result: any;
    page: any;
    loading: boolean;
    displayDialog: boolean;
    tituloDialog: string;
    menu: any = {};
    selectedRegistro: any;
    newMenu: boolean;
    calificaciones: any[];
    objetivos: any[];
    disabledFields: any[];
    public selectedEstado: any;
    public id: string;
    public errorMessage: any;
    public error: any;
    public confirmado;
    public camposBusqueda: any;
    public totalRecords: number;
    public errors: any;
    public errorsForm: any;
    public collapseOptions: CollapseOptions;
    public RegistrosPorPagina = 10;
    items: MenuItem[];
    public params: any;
    public config: ConfigPagination;
    public comportamientoForm: any;
    enabledMultipleSelection: boolean = false;
    multipleSelectionMenu: MenuItem[];
    unselectAllRows: boolean = false

    constructor(
        private _validadorService: ValidadorService,
        private menuService: MenuService,
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
        }
        this.items = [
            {label: 'Editar', icon: 'pi pi-pencil', command: (event) => this.editarRegistro()},
            {label: 'Borrar Menu', icon: 'pi pi-times', command: (event) => this.borrarMenu()}

        ];
        //   setTimeout(() => {
        this.disabledFields = ['estado_menu_evaluacion', 'comentarios', 'objectivo', 'definicion_objetivo'];
        var configCalendar = {}
        /***********configuro la tabla******************/
        this.config = {
            /*****registro por pagina *************/
            rowsPerPage: 10,
            allowGlobalSearch: false,
            allowServerSide: true
        }
        this.cols = [
            {
                header: "ID",
                field: 'id',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "input",
                placeHolder: "Id",
                allowFiltered: true,
                required: false,
                //   pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
                type: "number",
                disabled: true
            },
            {
                header: "Nombre",
                field: 'nombre',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "input",
                placeHolder: "Nombre",
                allowFiltered: true,
                required: true,
                pattern: '^[a-zA-Z0-9 áéíóúÑñ]{2,80}$',
                type: "string",
                disabled: false
            },

            {
                header: "Ruta",
                field: 'ruta',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "input",
                placeHolder: "Ruta ej /gestion/usuario",
                allowFiltered: true,
                required: true,
                pattern: '^[a-zA-Z0-9/áéíóúÑñ]{5,80}$',
                type: "string",
                disabled: false
            },
            {
                header: "Baja",
                field: 'baja',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "checkbox",
                placeHolder: "baja",
                allowFiltered: true,
                required: false,
                // pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
                type: "boolean",
                disabled: false
            }, {
                header: "Orden",
                field: 'children_order',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "number",
                placeHolder: "Orden",
                allowFiltered: true,
                required: true,
                //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
                type: "number",
                disabled: false
            },
            {
                header: "Class estilo",
                field: 'estilo',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "input",
                placeHolder: "Class estilo",
                allowFiltered: true,
                required: true,
                //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
                type: "string",
                disabled: false
            },
            {
                header: "Class Icono",
                field: 'icono',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "input",
                placeHolder: "Class Icono",
                allowFiltered: true,
                required: true,
                //  pattern: '^[a-zA-Z0-9 áéíóúÑñ]{5,20}$',
                type: "string",
                disabled: false
            }

        ]

        this.columnas = this.cols;

        this.loading = true;
        this.buttons = [
            {
                class: "ui-button-success",
                icon: "fa fa-close",
                label: "Guardar",
                disabled: false,
                execute: this.save.bind(this)
            }


        ];
        this.actionButtons = [
            {
                class: "",
                icon: "fa fa-plus",
                label: "Agregar",
                disabled: false,
                execute: this.showDialogToAdd.bind(this)
            },

        ];


        this.loading = false;

    }

    Consulta(params) {
        this.menuService.getAllMenuesUsingGET(params)
            .subscribe(resp => {
                    if (!resp) {
                        this.showError("Error en el servidor")
                    } else {
                        this.menus = resp['body']['content'];
                        this.page = resp['body'].page;
                        this.config.totalRecords = resp['body'].page.total_elements;
                    }
                },
                error => {
                    /******************/
                    this.errorMessage = <any>error;
                    this.Log("Error ", this.errorMessage);
                    if (this.errorMessage.error && this.errorMessage['error']['message']) {
                        var resp = this.errorMessage.error['body'];
                        this.Log("Error consulta ---->", this.errors);
                        this.showError("Error consulta ---->",this.errorMessage['error']['message'])
                    } else {
                        this.showError("Error ", "servidor fuera de servicio"+this.errorMessage)
                    }

                    /**************************/

                });


    }

    ConsultaServer(event) {
        var page = 0;
        if (event.first > 0) {
            page = event.first / event.rows;
        }
        var sort = "";
        var orden = "";
        if (event.sortField && event.sortField != "") {
            event.sortField = this.toCamelCase(event.sortField);
            if (event.sortOrder == 1) {
                orden = "asc";
            } else {
                orden = "desc";
            }
            var campo = this.cols.find(campob => campob.field == event.sortField)
            if (campo && campo.type == "object" && campo.metodo && campo.metodo != "") {
                sort = event.sortField + "." + campo.metodo + "," + orden;
            } else {
                sort = event.sortField + "," + orden;
            }

        } else {
            sort = "id,asc";
        }
        const params = {
            sort: sort,
            size: event.rows,
            page: page

        }
        this.params = params;
        var index;
        for (index in event.filters) {
            params[index] = event.filters[index].value;
        }
        this.Consulta(params);

    }

    onHide() {

        this.emptyErrors()
    }

    emptyErrors() {
        this.errorsForm = []
        this.comportamiento = []
        this.cols.forEach(campo => {
            var dat = {
                valid: true,
                message: ""
            }
            this.errorsForm[campo.field] = dat;
        })

    }


    getDataFromCol(index, cols) {
        var camp = {}
        var campo = {}
        cols.forEach(campo => {
            if (index == campo.field) {
                camp = campo
            }
        })
        return camp;
    }

    getDescripcionFromId() {
        var descripcion = ""
        this.menus.forEach(campo => {
            if (this.id == campo.id) {
                descripcion = campo.descripcion
            }
        })
        return descripcion
    }

    showDialogToAdd() {
        this.errors = [];
        this.setForm(1);
        this.newMenu = true;
        this.menu = {};
        this.menu.activo = true;
        this.tituloDialog = "Alta Menu";
        this.displayDialog = true;
    }


    getErrores() {
        let c = 1;
        let str = "<ul>";
        this.errors.forEach(mensaje => {
            var index;
            str += mensaje + "<br>";
            c++;
        });
        return str;
    }

    mostrarErrores() {
        let c = 1;
        this.errors.forEach(mensaje => {
            var index;
            for (index in this.columnas) {
                this.columnas[c].error = true;
                this.columnas[c].mensaje = mensaje;
            }
            c++;
        });
    }

    altaMenu(Menu) {
        this.menuService.AltaDeUnMenu(Menu).subscribe(
            response => {

                this.result = response;
                if (!this.result) {
                    alert('error en el servidor');
                } else {
                    if (this.result['body'] && this.result.status_code && this.result.status_code == 200) {
                        this.showSuccess("menu " + this.result['body'].nombre + "Dado de alta ok");
                        this.displayDialog = false;
                        this.refresh();
                    } else {
                        this.showError("No se pudo dar el alta ");
                    }

                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error ", this.errorMessage);
                if (this.errorMessage.error && this.errorMessage['error']['message']) {
                    var resp = this.errorMessage.error['body'];
                    this.Log("Error consulta ---->", this.errors);
                    this.showError("Error alta ---->",this.errorMessage['error']['message'])
                } else {
                    this.showError("Error ", "servidor fuera de servicio"+this.errorMessage)
                }

            }
        );

    }

    refresh() {
        this.Consulta(this.params);
    }

    onRowSelect(event) {

    }

    editarRegistro() {
        this.errors = [];

        /******habilito todos los campos para la modificacion ******/
        this.newMenu = false;
        /*******bajos los estados disponibles para un id de menu*******/
        this.menu = this.cloneEvaluacion(this.selectedRegistro);
        this.comportamiento = [];
        this.tituloDialog = "Editar Menu";
        this.displayDialog = true;
        setTimeout(() => {

        }, 1000);

    }


    onRowMenuSelect(event) {
        this.registro = event.data;
        this.id = event.data.id;


    }

    getYear(fecha) {
        if (fecha instanceof Date) {
            return fecha.getFullYear();
        } else {
            return fecha
        }
    }

    cloneEvaluacion(c: any):
        any {
        let menuEvaluacion = {};
        for (let prop in c) {
            menuEvaluacion[prop] = c[prop];
        }
        return menuEvaluacion;
    }

    convertToString(estado) {
        if (typeof estado === "object") {
            return estado.value;
        }
        return estado;
    }

    guardaMenu(Menu) {
        const params = {
            menuAltaDto: Menu,
            id: Menu.id
        }
        this.menuService.EditarUnMenu(params).subscribe(
            response => {
                this.result = response;
                if (!this.result) {
                    alert('error en el servidor');
                } else {
                  if (this.result.status_code == 200) {
                        this.Log("response ", this.result )
                        this.showSuccess("menu " + this.result['body'].nombre + " Modificado  ok");
                        this.displayDialog = false;
                        this.deleteMenuOnSession(this.session);
                        this.refresh();
                    } else {
                        this.showError("no se pudo modificar menu");
                    }

                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error ", this.errorMessage);
                if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status) {
                    var resp = this.errorMessage.error['body'];

                    if (typeof resp === "string") {
                        this.showError("error de Guardado")

                    } else {
                        this.errors = this.errorMessage.error['body'];
                    }
                    this.Log("error modificacion ---->", this.errors);

                }
            }
        );

    }

    save(menu) {
        if (this._validadorService.validarCampos(menu, this.columnas) == true) {
            if (this.newMenu == false) {
                this.guardaMenu(menu);
            } else {
                this.altaMenu(menu);
            }

        } else {
            this.errorsForm = this._validadorService.getErrorForm();
            this.showError("Error en la carga de datos ", "")

        }
    }


    //add textarea for next objectives
    addObjective(event, data = '') {
        if (this.comportamientoForm.comportamientos.data.length < this.comportamientoForm.comportamientos.max) {
            //extend array definiciones
            this.comportamientoForm.comportamientos.data.push(data);
        }
    }

    isMinusDisabled() {
        if (this.comportamientoForm.comportamientos.data.length > this.comportamientoForm.comportamientos.min) {
            return false;
        } else {
            return true
        }
    }

    isAddDisabled() {
        if (this.comportamientoForm.comportamientos.data.length < this.comportamientoForm.comportamientos.max) {
            return false;
        } else {
            return true
        }
    }

    removeObjective(event) {
        if (this.comportamientoForm.comportamientos.data.length > this.comportamientoForm.comportamientos.min) {
            this.comportamientoForm.comportamientos.data.splice(-1, 1);
        }
    }

    setForm(min = 0) {
        this.comportamientoForm = {}
        this.comportamientoForm.comportamientos = []
        if (this.comportamientoForm.comportamientos) {
            this.comportamientoForm.comportamientos.min = 1
            this.comportamientoForm.comportamientos.max = 3
            if (!this.comportamientoForm.comportamientos.data || !this.comportamientoForm.comportamientos.data.length) {
                this.comportamientoForm.comportamientos.data = _.fill(Array(min), '');
            }
        }

    }

    trackByFn(index: any, item: any) {
        return index;
    }

    borrarMenu() {
        var id = this.selectedRegistro.id;
        if (id && id != "0") {
            this.menuService.BorrarUnMenu(id).subscribe(
                response => {
                    if (!response) {
                        this.showError("error en el servidor")
                    } else {
                        if (response['body'] && response['body'] == true) {
                            ;
                            if (this.id) {
                                this.showSuccess("El Menu " + id + " fue borrado!!");
                            }

                        } else {
                            this.showError("error ", "debe estar pendiende para poder borrarse")
                        }

                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.Log("error delete menu ---->", this.errorMessage);
                    if (this.errorMessage.error['body'] && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error['body'])
                    }

                }
            );
        }
    }


}
