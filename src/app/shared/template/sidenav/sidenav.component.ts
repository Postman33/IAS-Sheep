import {Component, OnDestroy, OnInit} from '@angular/core';

import {NestedTreeControl} from '@angular/cdk/tree';

import {ArrayDataSource} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Subject, Subscription} from 'rxjs';
import {CrossVarService} from '../../services/cross-var.service';


interface NavNode {
  name: string;
  refLink?: string;
  icon?: string;
  iconClass?: string,
  children?: NavNode[];
}

const TREE_DATA: NavNode[] = [
  {
    name: 'Животные',
    icon: "pets",
    children: [
      {name: 'Учет животных', icon: 'receipt', iconClass: 'green', refLink:"/animals/sheep"},
      // {name: 'Учет баранов', icon: 'receipt', iconClass: 'orange'},
      // {name: 'Учет ягнят', icon: 'receipt', iconClass: 'blue'},
    ]
  },

  {
    name: 'Журнал',
    icon:"menu_book",
    children: [
      // {
      //   name: 'Бонитировка',
      // },
      {
        name: 'Чабаны',
        refLink: 'journal/chabans',
        icon: 'category', iconClass: 'green',
      },
      {
        name: 'Фермы',
        refLink: 'journal/farms',
        icon: 'category', iconClass: 'green',
      },
      {
        name: 'Отары',
        refLink: 'journal/otars',
        icon: 'category', iconClass: 'green',
      },
      {
        name: 'События',
        refLink: 'journal/events',
        icon: 'event', iconClass: 'orange',
      },
    ]
  },
  {name:"Уведомления",
    icon:"admin_panel_settings",
    // iconClass: "orange",
    children: [
      {name: "Список уведомлений",refLink: "notification/edit", icon: "notifications", iconClass: 'green'}

    ]},
  {
    name: "Отчеты",
    icon: "analytics",
    children: [
      {name:"За период",refLink: "report/stats", icon: "pie_chart", iconClass: 'orange'},
      {name:"Структура поголовья",refLink: "report/structure", icon: "pie_chart", iconClass: 'orange'},
      {name:"Настраиваемый отчет",refLink: "report/custom",icon: "dashboard", iconClass: 'orange'}

    ]
  }

];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {


  treeControl = new NestedTreeControl<NavNode>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);
  constructor(private router : Router, public authService : AuthService, private crossVarService :CrossVarService) {
  }
  CrossSub : Subscription

  Opened = true;


  hasChild = (_: number, node: NavNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.CrossSub = this.crossVarService.triggerState$.subscribe((res:boolean)=>{
      this.Opened= res;
    })
  }
  ngOnDestroy(): void {
    this.CrossSub.unsubscribe();
  }


}
