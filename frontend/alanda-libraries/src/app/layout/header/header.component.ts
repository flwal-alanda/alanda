import { Component, OnInit, HostListener } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { AlandaUserApiService } from 'projects/alanda-common/src/public-api';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('autoHide', [
      state('open', style({
        top: '0'
       })),
       state('closed', style({
        top: '-50px'
       })),
       transition('open <=> closed', [
         animate('0.3s')
       ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  value: Date;
  title = 'alanda-libraries';
  private scrollPos = 0;
  autoHide = true;

  constructor(public userService: AlandaUserApiService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe();
    this.items = [
      { label: 'Home', routerLink: [''], icon: 'fa fa-home',routerLinkActiveOptions: {} },
      { label: 'Tasks', routerLink: ['/tasks/list'], icon: 'fa fa-briefcase', routerLinkActiveOptions: {} },
      { label: 'Create', icon: 'fa fa-plus', routerLinkActiveOptions: {},
        items: [
          { label: 'Project', routerLink: ['/create/project'], icon: 'fa fa-list-alt', routerLinkActiveOptions: {} }
        ]
      },
      { label: 'Monitor', icon: 'fa fa-eye', routerLinkActiveOptions: {},
        items: [
          { label: 'Projects', routerLink: ['/monitor/projects'], icon: 'fa fa-list-alt', routerLinkActiveOptions: {} }
        ]
      },
      { label: 'Administration', icon: 'pi pi-cog', routerLinkActiveOptions: {},
      items: [
        { label: 'Users', routerLink: ['/admin/users'], icon: 'fa fa-list-alt', routerLinkActiveOptions: {} },
        { label: 'Groups', routerLink: ['/admin/groups'], icon: 'fa fa-list-alt', routerLinkActiveOptions: {} },
        { label: 'Roles', routerLink: ['/admin/roles'], icon: 'fa fa-list-alt', routerLinkActiveOptions: {} },
        { label: 'Permissions', routerLink: ['/admin/permissions'], icon: 'fa fa-list-alt', routerLinkActiveOptions: {} }
      ]
    },
    ]
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > this.scrollPos) {
      this.scrollPos = window.pageYOffset;
      this.autoHide =  false;
    } else {
      this.scrollPos = window.pageYOffset;
      this.autoHide = true;
    }
  }

  releaseRunAs() {
    this.userService.releaseRunAs().subscribe();
  }
}