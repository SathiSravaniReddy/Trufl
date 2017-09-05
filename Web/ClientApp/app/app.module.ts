import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UniversalModule } from 'angular2-universal';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from './components/app/app.component';
import { HostessComponent } from './components/Hostess/hostess.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResturantComponent } from './components/resturant/resturant.component';
import { EmployeeConfigurationComponent } from './components/employeeconfiguration/employeeconfiguration.component';
import { SeatedComponent } from './components/seated/seated.component';
import { SeatedService } from './components/seated/seated.service';
import { HeaderComponent } from './components/shared/Header/header.Component';
import { HostessService } from './components/Hostess/hostess.service';
import { LoginService } from './components/shared/login.service';
import { EqualValidator } from './components/login/password-match.directive';


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
        EqualValidator
    ],
    providers: [
        SeatedService,
        HostessService,
        LoginService,
       { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    


    imports: [
        UniversalModule, // Must be firsst import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forRoot([
            { path: '', component: LoginComponent },    
            { path: 'seated', component: SeatedComponent },
            { path: 'home', component: HostessComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'restaurant', component: ResturantComponent },
            { path: 'employeeconfiguration', component: EmployeeConfigurationComponent },
            { path: '**', redirectTo: 'home' },
        ])
    ],
})
export class AppModule {
}
