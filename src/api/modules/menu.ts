import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { Menu } from "@/api/interface/menu";

/**
 * 切换用户状态
 * @param params 参数
 */
export const menuList = (params: Menu.ReqMenuParams) => {
  return http.get(PORT1 + `/menu`, params);
};
