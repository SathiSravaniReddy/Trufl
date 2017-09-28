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
//import { AuthGuard } from './components/shared/authgaurd.service';
import { StartServiceComponent } from "./components/startservice/start-service.component";
import { SelectSelectionsComponent } from "./components/selectselections/select-selections.component";
import { SelectStaffComponent } from "./components/selectstaff/select-staff.component";
import { ReviewSelectionsComponent } from "./components/reviewselections/review-selections.component";
import { OtherSettingsComponent } from "./components/defaultsettings/othersettings/other-settings.component";
import { DefaultSettingsComponent } from "./components/defaultsettings/default-settings.component";
import { ManageServersComponent } from "./components/defaultsettings/manageservers/manage-servers.component";
import { DefineSelectionsComponent } from "./components/defaultsettings/defineselections/define-selections.component";
import { SeataGuestComponent } from "./components/seataguest/seataguest.component";
import { AddGuestComponent } from "./components/addguest/addguest.component";
import { DefineSelectionService } from "./components/defaultsettings/defineselections/define-selection.service";
import { ManageServersService } from "./components/defaultsettings/manageservers/manage-servers.service";
import { OtherSettingsService } from "./components/defaultsettings/othersettings/other-settings.service";
import { SidebarModule } from 'ng-sidebar';
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
        StartServiceComponent,
        SelectSelectionsComponent,
        SelectStaffComponent,
        ReviewSelectionsComponent,
        OtherSettingsComponent,
DefaultSettingsComponent,
 ManageServersComponent ,
 DefineSelectionsComponent,
 SeataGuestComponent ,

    AddGuestComponent 


        
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
        DatePipe,
        EmployeeConfigService,
        OtherSettingsService,
        ManageServersService,
        DefineSelectionService,
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
        SidebarModule.forRoot(),
     
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
            //{path: 'login', component: LoginComponent,
            //    children: [  
            //        { path: 'seated', component: SeatedComponent },
            //        { path: 'waitlist', component: HostessComponent },
            //        { path: 'register', component: RegisterComponent },
            //        { path: 'settings', component: SettingsComponent },
            //        { path: 'hostesssettings', component: HostessSettingsComponent},
            //        { path: 'dashboard', component: DashboardComponent },
            //        { path: 'restaurant', component: ResturantComponent },
            //        { path: 'employeeconfiguration', component: EmployeeConfigurationComponent },
            //    ]
            //},
            { path: 'hostessdashboard', component: HostessDashboardComponent },
            { path: 'login', component: LoginComponent },
            { path: 'seated', component: SeatedComponent },
            { path: 'waitlist', component: HostessComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'hostesssettings', component: HostessSettingsComponent},
            { path: 'dashboard', component: DashboardComponent },
            { path: 'restaurant', component: ResturantComponent },
            { path: 'employeeconfiguration', component: EmployeeConfigurationComponent },
            { path: 'startservice', component: StartServiceComponent },
            { path: 'selectselections', component: SelectSelectionsComponent },
            { path: 'selectStaff', component: SelectStaffComponent },
            { path: 'reviewSelections', component: ReviewSelectionsComponent },
            { path: 'defineSelections', component: DefineSelectionsComponent },
            { path: 'manageServers', component: ManageServersComponent },
            { path: 'otherSettings', component: OtherSettingsComponent },
            { path: 'defaultSettings', component: DefaultSettingsComponent },   
            { path: 'seataGuest', component: SeataGuestComponent },   
            { path: 'addGuest', component: AddGuestComponent },   
            
            { path: '**', redirectTo: 'login' },

           
        ])
    ],
})
export class AppModule {
}
