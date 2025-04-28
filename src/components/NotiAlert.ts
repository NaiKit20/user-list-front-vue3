import { notification } from "ant-design-vue";

export function fnNotiAlert(message: string) {
  notification.open({
    message: message,
  });
}
