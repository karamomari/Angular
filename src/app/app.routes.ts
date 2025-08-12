import { Routes } from '@angular/router';
import { HomeComponent } from './components/homecompnent/home/home.component';
import { LoginComponent } from './components/Authcomponent/login/login.component';
import { CartComponent } from './components/cartcomponent/cart/cart.component';
import { NotfaundComponent } from './components/Notfaund/notfaund/notfaund.component';
import { UserDashboardComponent } from './components/UserComponents/user-dashboard/user-dashboard.component';
import { ProductsComponent } from './components/product/products/products.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
        {path:'',pathMatch:'full',redirectTo:'Home'},
    { path: 'Home', component: HomeComponent },
    {path:'product-details/:id',component:ProductDetailsComponent},
    { path: 'products', component: ProductsComponent },
    {path:'Login',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'cart',component:CartComponent},
    {path:'UserDashboard',component:UserDashboardComponent,canActivate:[authGuard]},
    { path: '**', component: NotfaundComponent }
];
