import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MessageService} from 'primeng/components/common/messageservice';
import {FormButton} from '../../../models/form-button';
import {CollapseOptions} from '../../../models/collapse-options';
import {MenuItem} from '../../../models/menu-item';
import {TableFiltered} from '../../../models/table-filtered';
import {BasePageComponent} from '../../components/base-page/base-page.component';
import {ConfigPagination} from '../../../models/config-pagination';
import {PermisoService} from '../../../services/permiso.service';

import {CategoriaPermisoService} from '../../../services/categoria-permiso.service';
import {MenuService} from '../../../services/menu.service';
import {ValidadorService} from '../../../services/validador.service';


@Component({
    selector: 'app-permisos',
    templateUrl: './permisos.component.html',
    styleUrls: ['./permisos.component.css'],
    providers: [CategoriaPermisoService, ValidadorService, MenuService, PermisoService]
})

export class PermisosComponent extends BasePageComponent implements OnInit {
    buttons: FormButton[];
    actionButtons: FormButton[];
    public registro: any;
    public permisos: any;
    public Permiso: any;
    public msgs: string;
    cols: TableFiltered[];
    columnas: any[];
    brands: any[];
    colors: any[];
    yearFilter: number;
    yearTimeout: any;
    result: any;
    page: any;
    loading: boolean;
    displayDialog: boolean;
    tituloDialog: string;
    permiso: any = {};
    selectedRegistro: any;
    newPermiso: boolean;
    calificaciones: any[];
    objetivos: any[];
    public categorias: any;
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

    constructor(
        private _categoriaPermisoService: CategoriaPermisoService,
        private _permisoService: PermisoService,
        private messageService: MessageService,
        private _validadorService: ValidadorService,
        private _menuService: MenuService,
        private router: Router) {
        super(messageService);
    }

    ngOnInit() {
        this.loading = true;

        this.collapseOptions = {
            hidden: true,
            disabled: false
        }
        this.items = [
            {label: 'Editar', icon: 'pi pi-pencil', command: (event) => this.editarRegistro()}
        ];
        //   setTimeout(() => {
        this.disabledFields = ['estado_permiso_evaluacion', 'comentarios', 'objectivo', 'definicion_objetivo'];
        var configCalendar = {}
        /***********configuro la tabla******************/
        this.config = {
            /*****registro por pagina *************/
            rowsPerPage: 10,
            allowGlobalSearch: true,
            allowServerSide: true
        }
        // ^[a-zA-Z áéíóú]+$
        this.cols = [                                                              // ^[a-zA-Z áéíóú]+$
            {
                header: "Id",
                field: 'id',
                allowFiltered: true,
                input: "input",
                required: false,
                type: "nomber",
                disabled: false
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

                pattern: '^[A-Z_ÁÉÍÓÚÑ]{5,500}$',
                type: "string",
                disabled: false
            },

            {
                header: "Descripcion",
                field: 'descripcion',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "textarea",
                placeHolder: "Descripcion",
                allowFiltered: true,
                required: true,
                pattern: '^[a-zA-Z0-9 ,/áéíóúÑñ]{1,100}$',
                type: "string",
                disabled: false
            },
            {
                header: "baja",
                field: 'baja',
                classPadre: "ui-g-12",
                class: "ui-g-12",
                type: "boolean",
                input: "checkbox",
                data: this.getTF(),
                disabled: false
            },
            {
                header: "logear",
                field: 'logear',
                classPadre: "ui-g-12",
                class: "ui-g-12",
                type: "boolean",
                input: "checkbox",
                data: this.getTF(),
                disabled: false
            },
            {
                header: "Categoría",
                field: 'categoria_permiso',
                classPadre: "ui-g-12",
                class: "ui-g-12",
                type: "object",
                input: "select",
                metodo: "nombre",
                data: [],
                disabled: false
            },
            {
                header: "Menu",
                field: 'menu',
                classPadre: "ui-g-12",
                class: "ui-g-12",
                type: "object",
                input: "select",
                metodo: "nombre",
                data: [],
                disabled: false
            },

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
        //   }, 1000);
    }

    Consulta(params) {
        this._permisoService.getAllPermisosUsingGET(params)
            .subscribe(resp => {
                    if (!resp) {

                        this.showError("error en el servidor")
                    } else {
                        this.permisos = resp['body']['content'];

                    }
                },
                error => {

                    this.errorMessage = <any>error;
                    this.Log("error consulta ---->", this.errorMessage);
                    this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                    if (this.errorMessage.error['body'] && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error['body'])
                    }

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
                orden = "desc";
            } else {
                orden = "asc";

            }
            sort = event.sortField + "," + orden;
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
        var col;
        for (index in event.filters) {
            col = this.getDataFromCol(index, this.cols)
            if (col.type == "date") {
                var date = this.getDatefromStr(event.filters[index].value, "ES");
                if (typeof date === "object") {
                    params[index] = this.convertirFechaBd(date);
                } else {
                    params[index] = event.filters[index].value;
                }
            } else {
                params[index] = event.filters[index].value;

            }

        }
        this.Consulta(params);

    }

    getDatefromStr(datestr, lang = "US") {
        if (typeof datestr === "string") {
            var dateArray;
            var year;
            var month;
            var day;

            if (lang == "ES") {
                dateArray = datestr.split("/")
                year = dateArray[2];
                month = dateArray[1];
                day = dateArray[0];

            } else {
                dateArray = datestr.split("-")
                year = dateArray[0];
                month = dateArray[1];
                day = dateArray[2];
            }
            return new Date(year + "-" + month + "-" + day + "T00:00:00-0300")
        } else {
            return datestr;
        }


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
        this.permisos.forEach(campo => {
            if (this.id == campo.id) {
                descripcion = campo.descripcion
            }
        })
        return descripcion
    }

    showDialogToAdd() {
        this.errors = [];
        this.newPermiso = true;
        this.permiso = {};
        this.permiso.categoria_permiso = this.getCategorias(true);


        this.columnas.forEach(columna => {
            if (columna.field == "categoria_permiso") {
                columna.data = this.getCategorias(true);
            }
            if (columna.field == "menu") {
                columna.data = this.getMenus(true)
            }

        })
        this.tituloDialog = "Alta Permiso";
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

    altaPermiso(Permiso) {
        Permiso.categoria_permiso_id = Permiso.categoria_permiso;
        Permiso.menu_id = Permiso.menu;
        this._permisoService.AltaDeUnPermiso(Permiso).subscribe(
            response => {
                //   this.PermisoEvaluacion = response['body'];
                this.result = response;
                if (!this.result) {

                    this.showError("error en el servidor")
                } else {
                     this.permiso = null;
                    this.displayDialog = false;
                    this.showSuccess("Alta dada ok")
                    this.refresh()
                    if (this.result && !!this.result['body'] && this.result['body'].id) {

                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error alta ---->", this.errorMessage);
                if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status && this.errorMessage.status == 400) {
                    var error = this.errorMessage.error['body'];
                    this.showError("Error",error)
                    this.Log("error alta ---->", error);
                }
            })

    }

    onRowSelect(event) {

    }

    editarRegistro() {
        this.errors = [];
        /******habilito todos los campos para la modificacion ******/
        this.newPermiso = false;
        /*******bajos los estados disponibles para un id de permiso*******/
        this.permiso = this.cloneEvaluacion(this.selectedRegistro);
        this.tituloDialog = "Editar Permiso";
        this.displayDialog = true;
        this.columnas.forEach(columna => {
            if (columna.field == "categoria_permiso") {
                columna.data = this.getCategorias(false);
            }
            if (columna.field == "menu") {
                columna.data = this.getMenus(false)
            }

        })
        // var categoria_permiso_id = this.permiso.categoria_permiso.id;
        // var menu_id = this.permiso.menu.id;
        setTimeout(() => {
            if (this.permiso.categoria_permiso) {
                this.permiso.categoria_permiso = this.permiso.categoria_permiso.id
            }
            if (this.permiso.menu) {
                this.permiso.menu = this.permiso.menu.id
            }
            ;
        }, 1000);
    }

    getTipoPermisos(alta = false) {
        var tipoPermisos = []
        if (alta == true) {
            let reg = {
                label: 'Seleccione->',
                value: ''
            }
            tipoPermisos.push(reg);
        }

        return tipoPermisos;
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
        let permisoEvaluacion = {};
        for (let prop in c) {
            permisoEvaluacion[prop] = c[prop];
        }
        return permisoEvaluacion;
    }

    convertToString(estado) {
        if (typeof estado === "object") {
            return estado.value;
        }
        return estado;
    }

    guardaPermiso(Permiso) {
        Permiso.categoria_permiso_id = Permiso.categoria_permiso;
        Permiso.menu_id = Permiso.menu;
        const params = {
            request: Permiso,
            id: Permiso.id
        }

        this._permisoService.EditarUnPermiso(params).subscribe(
            response => {

                this.result = response;
                if (!this.result) {
                    alert('error en el servidor');
                } else {
                    if (this.result && !!this.result['body'] && this.result['body'].id) {
                        this.permiso = null;
                        this.displayDialog = false;
                         this.refresh();
                        this.showSuccess("Registro " + this.result['body'].descripcion + " modificado ok")
                    } else {
                       
                        this.showError("El registro no se pudo modificar")

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

    save(permiso) {
        if (this._validadorService.validarCampos(permiso,this.columnas) == true) {
            if (this.newPermiso == false) {
                this.guardaPermiso(permiso);
            } else {
                this.altaPermiso(permiso);
            }

        } else {
            this.errorsForm=this._validadorService.getErrorForm();
            this.showError("Error en la carga de datos", "")
        }
    }

    refresh() {
        this.Consulta(this.params);
    }

    getCategorias(alta = false) {
        var Categorias = []
        if (alta == true) {
            let reg = {
                label: 'Seleccione->',
                value: ''
            }
            Categorias.push(reg);
        }
        const params = {
            sort: "id,asc",
            size: 100000,
            page: 0,
            nombre: "",
            descripcion: "",
            id: ""

        }

        this._categoriaPermisoService.getAllCategoriasPermisosUsingGET(params).subscribe(
            response => {
                this.result = response;
                if (!this.result['body']) {
                    this.showError("error en el servidor")
                } else {
                    this.result['body']['content'].forEach(valor => {
                        var registro = {
                            label: valor.nombre,
                            value: valor.id
                        }

                        Categorias.push(registro);
                    });
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error consulta ---->", this.errorMessage);
            }
        );
        return Categorias;
    }

    getMenus(alta = false) {
        var Menus = []
        let reg = {}
        if (alta == true) {
            reg = {
                label: 'Seleccione->',
                value: ''
            }
            Menus.push(reg);
        } else {
            reg = {
                label: 'Sin Menu',
                value: ''
            }
            Menus.push(reg);
        }
        var params = {
            sort: "id,asc",
            size: 100000,
            page: 0
        }

        this._menuService.getAllMenuesUsingGET(params).subscribe(
            response => {
                this.result = response;
                if (!this.result['body']) {
                    this.showError("error en el servidor")
                } else {
                    this.result['body']['content'].forEach(valor => {
                        var registro = {
                            label: valor.nombre,
                            value: valor.id
                        }

                        Menus.push(registro);
                    });
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error consulta ---->", this.errorMessage);
            }
        );
        return Menus;
    }


}
