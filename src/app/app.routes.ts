import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { ManageProfileComponent } from './components/pages/manage-profile/manage-profile.component';
import { MonitorActivityComponent } from './components/pages/monitor-activity/monitor-activity.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { ArtistDashboardComponent } from './components/pages/artist-dashboard/artist-dashboard.component';
import { CollaborationComponent } from './components/pages/collaboration/collaboration.component';
import { MyProductComponent } from './components/pages/my-product/my-product.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { EmployerDashboardComponent } from './components/pages/employer-dashboard/employer-dashboard.component';
import { InsightComponent } from './components/pages/insight/insight.component';
import { HireArtistComponent } from './components/pages/hire-artist/hire-artist.component';
import { ManageJobsComponent } from './components/pages/manage-jobs/manage-jobs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'products', component: ProductsComponent },
    //admin routes
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'manage-profile', component: ManageProfileComponent },
    { path: 'monitor-activity', component: MonitorActivityComponent },
    { path: 'settings', component: SettingsComponent },
    //artist routes
    { path: 'artist-dashboard', component: ArtistDashboardComponent },
    { path: 'collaboration', component: CollaborationComponent },
    { path: 'my-products', component: MyProductComponent },
    { path: 'jobs', component: JobsComponent },
    // employer routes
    { path: 'employer-dashboard', component: EmployerDashboardComponent },
    { path: 'insight', component: InsightComponent },
    { path: 'hire-artist', component: HireArtistComponent },
    { path: 'manage-jobs', component: ManageJobsComponent }
];
