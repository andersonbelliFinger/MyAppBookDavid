webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_status__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(http, param, modal, event) {
        this.http = http;
        this.param = param;
        this.modal = modal;
        this.event = event;
        this.data = new Date().toISOString();
        this.icons = [
            "spinner",
            "times",
            "thumbs-up",
            "check",
            "ban",
            "thumbs-down",
            "hourglass-start",
            "clock-o",
        ];
        this.item = 'time';
        this.time = true; // false - ASC; true - DESC
        this.name = false;
        this.profissional = param.get('profissional');
        this.funcionario = param.get('funcionario');
        console.log(this.funcionario);
        var data = localStorage.getItem('data');
        if (data) {
            this.data = new Date(data).toISOString();
        }
        this.get();
    }
    HomePage.prototype.get = function () {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
        var data = this.data.replace('T', ' ').substring(0, 19);
        this.items = [];
        localStorage.setItem('data', data);
        this.http.post('https://clientes.fingerprint.com.br/kort/admin/agendamento_ajax.php', {
            d: data,
            e: this.profissional.id_empresa,
            p: this.profissional.id_profissional,
            i: [(this.funcionario ? this.funcionario : this.profissional.id_profissional)],
        }, options)
            .subscribe(function (data) {
            var response = JSON.parse(data["_body"]);
            if (response.success) {
                var data_1 = response.data[0];
                if (data_1) {
                    for (var i = 0; i < data_1.agendamento.length; i++) {
                        var agendamento = data_1.agendamento[i];
                        _this.items.push({
                            color: '5px solid ' + agendamento.cor.border,
                            time: agendamento.inicio.substring(11, 16) + "~" + agendamento.fim.substring(11, 16),
                            name: agendamento.cliente,
                            service: agendamento.servico,
                            status: agendamento.status.substring(3)
                        });
                    }
                }
            }
            else {
                alert(response.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.status = function () {
        var _this = this;
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_3__modal_status__["a" /* StatusModal */], { status: this.icons });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.icons = data.status;
        });
    };
    HomePage.prototype.changeDate = function (day) {
        var data = new Date(this.data);
        data.setDate(data.getDate() + day);
        this.data = data.toISOString();
        this.get();
    };
    HomePage.prototype.byTime = function () {
        this.item = 'time';
        this.items = this.sortName(this.time);
    };
    HomePage.prototype.byName = function () {
        this.item = 'name';
        this.items = this.sortName(this.name);
    };
    HomePage.prototype.sortName = function (desc) {
        if (desc === void 0) { desc = false; }
        var item = this.item;
        var another = this.items.slice(0);
        another.sort(function (a, b) {
            var x = a[item].toLowerCase();
            var y = b[item].toLowerCase();
            if (desc) {
                return x > y ? -1 : x < y ? 1 : 0;
            }
            return x < y ? -1 : x > y ? 1 : 0;
        });
        this.time = item == 'time' ? !desc : false;
        this.name = item == 'name' ? !desc : false;
        return another;
    };
    HomePage.prototype.style = function (icon) {
        switch (icon) {
            case 'times':
            case 'ban':
            case 'thumbs-down':
                return 'danger';
            case 'thumbs-up':
            case 'check':
                return 'secondary';
            default:
                return 'primary';
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\drocha\ionic\myappbook\src\pages\home\home.html"*/'<ion-header>\n  	<ion-grid>\n  		<ion-row>\n  			<ion-col col-2>\n		    	<button ion-button menuToggle>\n		      		<ion-icon name="menu"></ion-icon>\n		    	</button>\n		    </ion-col>\n		    <ion-col col-8 text-center>\n    			<img src="assets/imgs/logo.svg" />\n    		</ion-col>\n  			<ion-col col-2 text-right>\n		    	<button ion-button>\n		      		<ion-icon name="ios-notifications"></ion-icon>\n		    	</button>\n		    </ion-col>\n		</ion-row>\n  		<ion-row>\n  			<ion-col col-12 text-center no-padding>\n			    <ion-label>CHOOSE WHICH DAY DO YOU WANT</ion-label>\n  			</ion-col>\n  		</ion-row>\n  		<ion-row>\n  			<ion-col no-padding col-2>\n		    	<button ion-button (tap)="changeDate(-1)">\n		      		<ion-icon class="dias" name="ios-arrow-back"></ion-icon>\n		    	</button>\n		    </ion-col>\n		    <ion-col col-8 text-center no-padding>\n			  	<ion-item id="data">\n			  		<ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="data"></ion-datetime>\n				  	<ion-icon item-right name="ios-calendar-outline"></ion-icon>\n			  	</ion-item>\n    		</ion-col>\n  			<ion-col col-2 no-padding text-right (tap)="changeDate(1)">\n		    	<button ion-button>\n		      		<ion-icon class="dias" name="ios-arrow-forward"></ion-icon>\n		    	</button>\n		    </ion-col>\n		</ion-row>\n  		<ion-row>\n  			<ion-col col-12 text-center no-padding>\n			    <ion-label no-margin>SCHEDULES</ion-label>\n  			</ion-col>\n  		</ion-row>\n  		<ion-row id="filtro" padding>\n  			<ion-col col-4 no-padding>\n		    	<button ion-button full (tap)="byTime()" [attr.selected]="item == \'time\' ? \'\' : null">\n		    		<sup>\n		    			<ion-icon name="{{ time ? \'arrow-up\' : \'arrow-down\' }}"></ion-icon>\n		    			&nbsp;\n		    		</sup>\n		    		HOUR\n		      		<ion-icon padding-left name="ios-alarm-outline"></ion-icon>\n		    	</button>\n		    </ion-col>\n		    <ion-col col-4 no-padding>\n		    	<button ion-button full (tap)="byName()" [attr.selected]="item == \'name\' ? \'\' : null">\n		    		<sup>\n		    			<ion-icon name="{{ name ? \'arrow-up\' : \'arrow-down\' }}"></ion-icon>\n		    			&nbsp;\n		    		</sup>\n		      		NAME\n		      		<ion-icon padding-left name="ios-people-outline"></ion-icon>\n		    	</button>\n    		</ion-col>\n  			<ion-col col-4 no-padding>\n		    	<button ion-button full (tap)="status()">\n		      		STATUS\n		      		<ion-icon padding-left name="ios-arrow-down"></ion-icon>\n		    	</button>\n		    </ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-header>\n\n<ion-content>\n	<ion-list>\n  		<ion-row id="item" *ngFor="let item of items">\n  			<ion-item no-padding no-margin col-4 [ngStyle]="{\'border-left\' : item.color }" *ngIf="icons.indexOf(item.status) != -1">\n  				{{ item.time }}\n  			</ion-item>\n  			<ion-item no-padding col-8 *ngIf="icons.indexOf(item.status) != -1">\n		    	<h2>{{ item.service }}</h2>\n		    	<p>{{ item.name }}</p>\n		      	<fa-icon name="{{ item.status }}" color="{{ style(item.status) }}" item-right></fa-icon>\n		    </ion-item>\n		</ion-row>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\drocha\ionic\myappbook\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatusModal = /** @class */ (function () {
    function StatusModal(nav, view, params) {
        this.nav = nav;
        this.view = view;
        this.params = params;
        this.all = true;
        this.selected = [];
        this.selected = params.get('status');
        this.all = this.selected.length == 8;
    }
    StatusModal.prototype.close = function () {
        this.view.dismiss({ 'status': this.selected });
    };
    StatusModal.prototype.set = function (item) {
        var index = this.selected.indexOf(item);
        if (index != -1) {
            this.selected.splice(index, 1);
            this.all = false;
        }
        else {
            this.selected.push(item);
            if (this.selected.length == 8)
                this.all = true;
        }
    };
    StatusModal.prototype.selectAll = function () {
        if (this.all) {
            this.selected = [];
            this.all = false;
        }
        else {
            this.selected = [
                "spinner",
                "times",
                "thumbs-up",
                "check",
                "ban",
                "thumbs-down",
                "hourglass-start",
                "clock-o",
            ];
            this.all = true;
        }
    };
    StatusModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'modal-status',template:/*ion-inline-start:"C:\Users\drocha\ionic\myappbook\src\pages\modal\status.html"*/'<ion-list>\n	<ion-item>\n    <small>CHOOSE WHICH STATUS DO YOU WANT SEE</small>\n    <fa-icon name="times" color="danger" item-end (tap)="close()"></fa-icon>\n	</ion-item>\n	<ion-item (tap)="selectAll()" [ngClass]="all ? \'selected\' : \'\'">\n    ALL\n	</ion-item>\n	<ion-item (tap)="set(\'spinner\')" [ngClass]="selected.indexOf(\'spinner\') != -1 ? \'selected\' : \'\'">\n    ATTENDANCE\n    <fa-icon name="spinner" color="primary" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'times\')" [ngClass]="selected.indexOf(\'times\') != -1 ? \'selected\' : \'\'">\n    CANCELED\n    <fa-icon name="times" color="danger" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'thumbs-up\')" [ngClass]="selected.indexOf(\'thumbs-up\') != -1 ? \'selected\' : \'\'">\n    CONFIRMED\n    <fa-icon name="thumbs-up" color="secondary" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'check\')" [ngClass]="selected.indexOf(\'check\') != -1 ? \'selected\' : \'\'">\n    FINISHED\n    <fa-icon name="check" color="secondary" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'ban\')" [ngClass]="selected.indexOf(\'ban\') != -1 ? \'selected\' : \'\'">\n    MISSED\n    <fa-icon name="ban" color="danger" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'thumbs-down\')" [ngClass]="selected.indexOf(\'thumbs-down\') != -1 ? \'selected\' : \'\'">\n    NOT CONFIRMED\n    <fa-icon name="thumbs-down" color="danger" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'hourglass-start\')" [ngClass]="selected.indexOf(\'hourglass-start\') != -1 ? \'selected\' : \'\'">\n    SCHEDULED\n    <fa-icon name="hourglass-start" color="primary" item-end></fa-icon>\n	</ion-item>\n	<ion-item (tap)="set(\'clock-o\')" [ngClass]="selected.indexOf(\'clock-o\') != -1 ? \'selected\' : \'\'">\n    WAIT\n    <fa-icon name="clock-o" color="primary" item-end></fa-icon>\n	</ion-item>\n	<!-- <ion-item>\n    <button ion-button full no-margin (tap)="close()">FILTER</button>\n	</ion-item> -->\n</ion-list>'/*ion-inline-end:"C:\Users\drocha\ionic\myappbook\src\pages\modal\status.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], StatusModal);
    return StatusModal;
}());

//# sourceMappingURL=status.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_profissional__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__provider_funcionario__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(menu, nav, profissional, http, event) {
        this.nav = nav;
        this.profissional = profissional;
        this.http = http;
        this.event = event;
        menu.enable(false, 'myMenu');
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
        this.http.post('https://clientes.fingerprint.com.br/kort/admin/index_cadastro_ajax.php', {
            email: this.email,
            senha: this.senha
        }, options)
            .subscribe(function (data) {
            var response = JSON.parse(data["_body"]);
            if (response.success) {
                var funcionarios = [];
                for (var i in response.info.h) {
                    var f = new __WEBPACK_IMPORTED_MODULE_5__provider_funcionario__["a" /* Funcionario */]();
                    f.id = response.info.h[i].a;
                    f.nome = response.info.h[i].b;
                    f.selected = response.info.a == response.info.h[i].a;
                    funcionarios.push(f);
                }
                var p = new __WEBPACK_IMPORTED_MODULE_4__provider_profissional__["a" /* Profissional */]();
                p.email = _this.email;
                p.id_profissional = response.info.a;
                p.id_empresa = response.info.b;
                p.cpf = response.info.c;
                p.nome = response.info.d;
                p.foto = response.info.e;
                p.sexo = response.info.f;
                p.admin = response.info.g;
                p.lembrar = _this.lembrar;
                p.funcionarios = funcionarios;
                _this.profissional = p;
                console.log(_this.profissional);
                _this.event.publish('professional:created', _this.profissional, Date.now());
                localStorage.setItem('profissional', JSON.stringify(_this.profissional));
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], { profissional: _this.profissional });
            }
            else {
                alert(response.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'login-page',template:/*ion-inline-start:"C:\Users\drocha\ionic\myappbook\src\pages\login\login.html"*/'<ion-content padding>\n  	<ion-grid id="top">\n  		<ion-row>\n  			<ion-col offset-2 col-8 offset-2 padding text-center>\n  				<img src="assets/imgs/logo_colorido.svg" />\n  			</ion-col>\n  		</ion-row>\n  	</ion-grid>\n  	<ion-list>\n  		<ion-item id="email">\n  			<ion-label>\n  				<ion-icon name="md-person"></ion-icon>\n  			</ion-label>\n  			<ion-input [(ngModel)]="email" type="text" placeholder="E-mail" value="raphael.bruno@outlook.com.au"></ion-input>\n  		</ion-item>\n  		<ion-item id="senha">\n  			<ion-label>\n  				<ion-icon name="ios-lock"></ion-icon>\n  			</ion-label>\n  			<ion-input [(ngModel)]="senha" type="password" placeholder="******" value="Raphael@2018"></ion-input>\n  		</ion-item>\n  	</ion-list>\n  	<button id="login" ion-button full (tap)="login()">LOGIN</button>\n  	<ion-grid>\n  		<ion-row>\n  			<ion-col col-6>\n    			<ion-checkbox ([ngModel])="lembrar" class="checkbox-square" checked></ion-checkbox>\n  				Remember me\n  			</ion-col>\n  			<ion-col col-6 text-right>\n  				Forgot password?\n  			</ion-col>\n  		</ion-row>\n  	</ion-grid>\n</ion-content>\n\n<ion-footer padding no-border>\n	MYAPPBOOK © 2018 - ALL RIGHTS RESERVED\n</ion-footer>\n'/*ion-inline-end:"C:\Users\drocha\ionic\myappbook\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__provider_profissional__["a" /* Profissional */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profissional; });
var Profissional = /** @class */ (function () {
    function Profissional() {
    }
    return Profissional;
}());

//# sourceMappingURL=profissional.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Funcionario; });
var Funcionario = /** @class */ (function () {
    function Funcionario() {
    }
    return Funcionario;
}());

//# sourceMappingURL=funcionario.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_modal_status__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__provider_profissional__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__provider_funcionario__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_fa_icon_fa_icon_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_modal_status__["a" /* StatusModal */],
                __WEBPACK_IMPORTED_MODULE_10__components_fa_icon_fa_icon_component__["a" /* FaIconComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_modal_status__["a" /* StatusModal */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__provider_profissional__["a" /* Profissional */],
                __WEBPACK_IMPORTED_MODULE_9__provider_funcionario__["a" /* Funcionario */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, event) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.event = event;
        this.data = new Date().toISOString();
        this.initializeApp();
        event.subscribe('professional:created', function (p) {
            _this.profissional = p;
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.profissional = JSON.parse(localStorage.getItem('profissional'));
            _this.nav.setRoot(_this.profissional ? __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */], { profissional: _this.profissional });
            var data = localStorage.getItem('data');
            if (data) {
                _this.data = new Date(data).toISOString();
            }
        });
    };
    MyApp.prototype.filter = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], {
            profissional: this.profissional,
            funcionario: this.funcionario,
            data: this.data
        });
    };
    MyApp.prototype.onChange = function (value) {
        this.funcionario = value;
        this.event.publish('funcionario:created', this.funcionario, Date.now());
    };
    MyApp.prototype.logout = function () {
        localStorage.removeItem('profissional');
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\drocha\ionic\myappbook\src\app\app.html"*/'<ion-menu id="my-menu" [content]="content" *ngIf="profissional">\n\n  <ion-header id="myMenu" no-border>\n      <ion-grid>\n        <ion-row>\n          <ion-col no-padding col-2>\n            <button id="fechar" ion-button menuClose>\n                <ion-icon name="md-close"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col col-8 text-center>\n            <img src="assets/imgs/logo.svg" />\n          </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-header>\n\n  <ion-content>\n    <ion-grid>\n      <ion-row padding-top>\n        <ion-col col-12 text-center>\n            <img id="foto" src="{{ profissional ? profissional.foto : \'assets/imgs/profile.png\' }}" />\n        </ion-col>\n      </ion-row>\n        <ion-row>\n          <ion-col col-10 offset-1 text-center no-padding>\n            <ion-item style="margin-bottom: 0px !important;">\n              <ion-input type="text" text-center disabled value="HELLO {{ profissional ? profissional.nome : \'\' }}"></ion-input>\n            </ion-item>\n          </ion-col>\n      </ion-row>\n      <ion-row *ngIf="profissional.funcionarios.length">\n        <ion-col col-12 text-center no-padding>\n          <ion-label>WHICH PROFESSIONAL DO YOU WANT SEE</ion-label>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="profissional.funcionarios.length" margin-bottom>\n        <ion-col col-10 offset-1 text-center no-padding>  \n          <ion-select col-12 [(ngModel)]="funcionario" (ionChange)="onChange($event)">\n              <ion-option value="{{ funcionario.id }}" *ngFor="let funcionario of profissional.funcionarios" [selected]="profissional.id_profissional == funcionario.id">{{ funcionario.nome }}</ion-option>\n          </ion-select>\n          <ion-icon id="seta" name="ios-arrow-down-outline"></ion-icon>\n        </ion-col>\n      </ion-row>\n        <ion-row>\n          <ion-col col-10 offset-1 text-center no-padding>\n            <ion-item id="data">\n              <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="data" (blur)="updateDate($event)"></ion-datetime>\n              <ion-icon item-right name="ios-calendar-outline"></ion-icon>\n            </ion-item>\n          </ion-col>\n      </ion-row>\n        <ion-row>\n          <ion-col col-10 offset-1 text-center no-padding margin-bottom>\n            <button id="filtro" ion-button full (click)="filter()" menuClose>FILTER</button>\n          </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-content>\n\n  <ion-footer no-border>\n    <ion-grid>\n        <ion-row>\n          <ion-col col-10 offset-1 text-center no-padding margin-bottom>\n            <button id="sair" ion-button full (click)="logout()" menuClose>LOGOUT</button>\n          </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-footer>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\drocha\ionic\myappbook\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaIconComponent = /** @class */ (function (_super) {
    __extends(FaIconComponent, _super);
    function FaIconComponent(config, elementRef, renderer) {
        return _super.call(this, config, elementRef, renderer, "fa") || this;
    }
    Object.defineProperty(FaIconComponent.prototype, "fixedWidth", {
        set: function (fixedWidth) {
            this.setElementClass("fa-fw", this.isTrueProperty(fixedWidth));
        },
        enumerable: true,
        configurable: true
    });
    FaIconComponent.prototype.ngOnChanges = function (changes) {
        if (changes.name) {
            this.unsetPrevAndSetCurrentClass(changes.name);
        }
        if (changes.size) {
            this.unsetPrevAndSetCurrentClass(changes.size);
        }
    };
    FaIconComponent.prototype.isTrueProperty = function (val) {
        if (typeof val === "string") {
            val = val.toLowerCase().trim();
            return (val === "true" || val === "on" || val === "");
        }
        return !!val;
    };
    ;
    FaIconComponent.prototype.unsetPrevAndSetCurrentClass = function (change) {
        this.setElementClass("fa-" + change.previousValue, false);
        this.setElementClass("fa-" + change.currentValue, true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], FaIconComponent.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], FaIconComponent.prototype, "size", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])("fixed-width"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], FaIconComponent.prototype, "fixedWidth", null);
    FaIconComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "fa-icon",
            template: "",
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], FaIconComponent);
    return FaIconComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Ion */]));

//# sourceMappingURL=fa-icon.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map