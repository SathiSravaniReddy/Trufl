import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component';
import { HostessComponent } from './components/Hostess/hostess.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResturantComponent } from './components/resturant/resturant.component';
import { RestaurenService } from './components/resturant/restaurent.service';
import { EmployeeConfigurationComponent } from './components/employeeconfiguration/employeeconfiguration.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SeatedComponent } from './components/seated/seated.component';
import { SeatedService } from './components/seated/seated.service';
import { HeaderComponent } from './components/shared/Header/header.Component';
import { HostessService } from './components/Hostess/hostess.service';
import { LoginService } from './components/shared/login.service';
import { TimerComponent } from './components/Hostess/timer.component';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common'
import { SettingsService } from './components/settings/settings.service';
import { SearchPipe } from './components/resturant/resturant.component';
import { EqualValidator } from './components/Register/password-match.directive';
import { HostessSettingsComponent } from './components/HostessSettings/settings.component';
import { HostessSettingsService } from './components/HostessSettings/settings.service'
import { DashboardService } from './components/dashboard/dashboard.service';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import {ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MyDatePickerModule } from 'mydatepicker';
import { EmployeeConfigService } from './components/employeeconfiguration/EmployeeConfiguration.service';

import { HostessDashboardComponent } from './components/HostessDashboard/hostessdashboard.component';
import { HostessDashboardService } from './components/HostessDashboard/hostessdashboard.service';
import { AuthGuard } from './components/shared/authgaurd.service';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HostessComponent,
        SeatedComponent,
        LoginComponent,
        RegisterComponent,
        SettingsComponent,
        DashboardComponent,
        ResturantComponent,
        EmployeeConfigurationComponent,
        HeaderComponent,
        TimerComponent,
        SearchPipe,
        EqualValidator,
        HostessSettingsComponent,
        HostessDashboardComponent,
        
        
    ],
    providers: [
        SeatedService,
        HostessService,
        SettingsService,
        LoginService,
        DashboardService,
        RestaurenService,
        HostessSettingsService,
        ToastsManager,
        AuthGuard,
        DatePipe,
        EmployeeConfigService,
        [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }]
    ],

    imports: [
        UniversalModule, // Must be firsst import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MyDateRangePickerModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        ToastModule,
        MyDatePickerModule, 
        
     
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
       
             { path: 'hostessdashboard', component: HostessDashboardComponent, canActivate: [AuthGuard]},
            { path: 'login', component: LoginComponent },
            { path: 'seated', component: SeatedComponent, canActivate: [AuthGuard] },
            { path: 'waitlist', component: HostessComponent, canActivate: [AuthGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
            { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
            { path: 'hostesssettings', component: HostessSettingsComponent, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'restaurant', component: ResturantComponent, canActivate: [AuthGuard] },
            { path: 'employeeconfiguration', component: EmployeeConfigurationComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: 'login' },

           
        ])
    ],
})
export class AppModule {
}
