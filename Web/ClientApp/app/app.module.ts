import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/Header/header.Component'
import { CourseSearchComponent } from './components/Course/courseSearch.Component'
import { PersonSearchComponent } from './components/Person/personSearch.Component'
import { LoginComponent } from './components/Login/login.Component';
import { CourseService } from './components/shared/courseService';
import { FormsModule } from '@angular/forms';
 

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CourseSearchComponent,
        PersonSearchComponent,
        LoginComponent,
        
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'course', component: CourseSearchComponent},
            { path: 'personDetails/:id', component: PersonSearchComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [CourseService]
})
export class AppModule {
}
