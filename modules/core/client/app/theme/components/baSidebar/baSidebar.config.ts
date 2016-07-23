import { __core_private__, Component } from '@angular/core';

class MenuConfig {
  constructor(public configs:Array<any>)
  {
  }
}

export interface MenuDefinition {
    title: string;
    component: Component;
    icon: string;
    selected?: boolean;
    expanded?: boolean;
    order?: number;
    subMenu?: Array<MenuDefinition>;
};

exports.MenuConfigImpl = MenuConfig;
exports.MenuConfig = __core_private__.makeDecorator(MenuConfig);
