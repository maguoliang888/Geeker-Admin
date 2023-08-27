import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 切换用户状态
 * @param params 参数
 */
export const changeEnabled = (params: { id: string }) => {
  return http.put(PORT1 + `/user/change-enabled/${params.id}`);
};

/**
 * 检查用户名是否存在
 * @param params 参数
 */
export const checkUsernameIsExists = (params: { id: string; username: string }) => {
  return http.get(PORT1 + `/user/check-username-is-exists/${params.id}`, { username: params.username });
};
