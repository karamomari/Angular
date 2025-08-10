import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/homecompnent/home/home.component';
import { LoadingServiceService } from './services/loading-service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/Layout/footer/footer.component';
import { NavbarComponent } from './components/Layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
   loading$ :any
  constructor(private loadingservice:LoadingServiceService){}
  ngOnInit(): void {
  this.loading$ = this.loadingservice.loading$;
  }
  title = 'Store';
}
