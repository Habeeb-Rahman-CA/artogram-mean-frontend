import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { ProductsComponent } from './components/pages/customer/products/products.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { ManageProfileComponent } from './components/pages/admin/manage-profile/manage-profile.component';
import { MonitorActivityComponent } from './components/pages/admin/monitor-activity/monitor-activity.component';
import { SettingsComponent } from './components/pages/admin/settings/settings.component';
import { ArtistDashboardComponent } from './components/pages/artist/artist-dashboard/artist-dashboard.component';
import { CollaborationComponent } from './components/pages/artist/collaboration/collaboration.component';
import { MyProductComponent } from './components/pages/artist/my-product/my-product.component';
import { JobsComponent } from './components/pages/artist/jobs/jobs.component';
import { EmployerDashboardComponent } from './components/pages/employer/employer-dashboard/employer-dashboard.component';
import { InsightComponent } from './components/pages/employer/insight/insight.component';
import { HireArtistComponent } from './components/pages/employer/hire-artist/hire-artist.component';
import { ManageJobsComponent } from './components/pages/employer/manage-jobs/manage-jobs.component';
import { CustomerProfileComponent } from './components/pages/customer/customer-profile/customer-profile.component';
import { ProductDetailComponent } from './components/pages/customer/product-detail/product-detail.component';
import { ArtistDetailComponent } from './components/pages/artist/artist-detail/artist-detail.component';
import { UploadProductComponent } from './components/pages/artist/upload-product/upload-product.component';
import { ProductListComponent } from './components/pages/artist/product-list/product-list.component';
import { OrdersPaymentsComponent } from './components/pages/artist/orders-payments/orders-payments.component';
import { MyCartComponent } from './components/pages/customer/my-cart/my-cart.component';
import { MyWishlistComponent } from './components/pages/customer/my-wishlist/my-wishlist.component';
import { TrackOrderComponent } from './components/pages/customer/track-order/track-order.component';
import { NotificationComponent } from './components/pages/notification/notification.component';

export const routes: Routes = [
    // basic routes
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'notification/:id', component: NotificationComponent },
    // admin routes
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'manage-profile', component: ManageProfileComponent },
    { path: 'monitor-activity', component: MonitorActivityComponent },
    { path: 'settings', component: SettingsComponent },
    // artist routes
    { path: 'artist-dashboard', component: ArtistDashboardComponent },
    { path: 'artist/:id', component: ArtistDetailComponent },
    { path: 'collaboration', component: CollaborationComponent },
    { path: 'my-products', component: MyProductComponent },
    { path: 'upload-product', component: UploadProductComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'orders-payments', component: OrdersPaymentsComponent },
    { path: 'jobs', component: JobsComponent },
    // employer routes
    { path: 'employer-dashboard', component: EmployerDashboardComponent },
    { path: 'insight', component: InsightComponent },
    { path: 'hire-artist', component: HireArtistComponent },
    { path: 'manage-jobs', component: ManageJobsComponent },
    // customer routes
    { path: 'products', component: ProductsComponent },
    { path: 'customer-profile', component: CustomerProfileComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'my-cart', component: MyCartComponent },
    { path: 'my-wishlist', component: MyWishlistComponent },
    { path: 'track-order', component: TrackOrderComponent }
];
