// 菜单管理模块
import { ReqPage } from "@/api/interface/index";

export namespace Menu {
  export interface ReqMenuParams extends ReqPage {
    title: string;
    name: string;
    path: string;
  }
  export interface ResMenuList {
    id: string;
    parentId: string;
    title: string;
    icon: string;
    name: string;
    path: number;
    component: string;
  }
}
