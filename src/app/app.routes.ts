import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { ManageProfileComponent } from './components/pages/manage-profile/manage-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'manage-profile', component: ManageProfileComponent },
];
