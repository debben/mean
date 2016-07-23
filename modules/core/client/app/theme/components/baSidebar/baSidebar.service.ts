import { Injectable, ApplicationRef, reflector, Component } from '@angular/core';
import { MenuConfigImpl as MenuConfig } from './baSidebar.config';
import { MenuDefinition } from './baSidebar.config';

let menuItems:Array<MenuDefinition> = [];

@Injectable()
export class BaSidebarService {

  private _router;

  constructor(appRef:ApplicationRef)
  {
    let component:Component;
    if(appRef.componentTypes.length == 1)
    {
      component = appRef.componentTypes[0];
      this.initMenuItems(menuItems, this.getMenuConfigFromComponent(component));
    }
  }

  private initMenuItems(parentArray:Array<MenuDefinition>, config:MenuConfig)
  {
    let _this = this;
    config.configs.forEach(function(menuDefinition:MenuDefinition){

      let subMenuConfig:MenuConfig = _this.getMenuConfigFromComponent(config.component);
      if(subMenuConfig){
        _this.initMenuItems(menuDefinition.subMenu, subMenuConfig);
      }
    });
    parentArray.push(...config.configs.map(function(config){
      config.component = config.component.name;
      return config;
    }));
  }

  private getMenuConfigFromComponent(component:Component)
  {
    let retVal;
    // make sure is type component.
    if(component) {
      let annotations = reflector.annotations(component);
      annotations.forEach(function(annotation){
        if(annotation instanceof MenuConfig)
        {
          retVal = annotation;
        }
      });
    }
    return retVal;
  }

  public getMenuItems():Array<Object> {
    return menuItems;
  }

  public setRouter(router): BaSidebarService {
    this._router = router;
    return this;
  }

  public selectMenuItem(items:Array<any>, currentPath:string) {
    let currentMenu;

    let assignCurrent = (menu) => (menu.selected ? currentMenu = menu : null);

    items.forEach((menu: any) => {

      this._selectItem(currentPath, [menu.component], menu);
      assignCurrent(menu);

      if (menu.subMenu) {
        menu.subMenu.forEach((subMenu) => {
          this._selectItem(currentPath, [menu.component, subMenu.component], subMenu, menu);
          assignCurrent(subMenu);
        });
      }
    });
    return currentMenu;
  }

  private _selectItem(currentPath, instructions, item, parentMenu = null) {
    let route = this._generateRoute(instructions);
    item.selected = !item.disabled && this._isCurrent(route) && this._resolvePath(route, '') == currentPath;
    if (parentMenu) {
      parentMenu.expanded = parentMenu.expanded || item.selected;
    }
  }

  private _isCurrent(route) {
    return route ? this._router.isRouteActive(route) : false;
  }

  private _generateRoute(instructions) {
    return instructions.filter(i => typeof i !== 'undefined').length > 0 ? this._router.generate(instructions) : null;
  }

  private _resolvePath(instruction, collected) {
    if (instruction !== null) {
      collected += instruction.urlPath + '/';
      return this._resolvePath(instruction.child, collected)
    } else {
      return collected.slice(0, -1);
    }
  }
}
