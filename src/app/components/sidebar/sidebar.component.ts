import {
  Component,
  HostListener,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
//import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() isMobile: EventEmitter<boolean> = new EventEmitter();
  isSidebarVisible: boolean = true;
  windowInnerWidth: number = window.innerWidth;
  active = 'inicio';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenWidth();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  checkScreenWidth() {
    this.windowInnerWidth = window.innerWidth;
    if (this.windowInnerWidth <= 768) {
      this.isSidebarVisible = false;
      this.isMobile.emit(true);
    } else {
      this.isSidebarVisible = true;
      this.isMobile.emit(false);
    }
  }
}
