import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = true;
  windowInnerWidth: number = window.innerWidth; // Agregar esta propiedad
  active = 'inicio';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenWidth();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.windowInnerWidth = window.innerWidth; // Actualizar el valor
    if (this.windowInnerWidth <= 768) {
      this.isSidebarVisible = false;
    } else {
      this.isSidebarVisible = true;
    }
  }
}
