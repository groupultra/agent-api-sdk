import type { MoobiusBasicConfig } from '@/index.d';
class MoobiusBASIC {
  defaults: MoobiusBasicConfig = {
    httpUrl: '',
    wsUrl: '',
  };
  config: MoobiusBasicConfig = {
    httpUrl: '',
    wsUrl: '',
  };
  auth = {
    sign_up: () => {},
    sign_in: () => {},
    sign_out: () => {},
    refresh: () => {},
    confirm_sign_up: () => {},
    resend_confirmation: () => {},
    confirm_reset_password: () => {},
    forgot_password: () => {},
  };
  channel = {
    create: () => {},
    update: () => {},
    popular: () => {},
    list: () => {},
    history_message: () => {},
  };
  file = {};
  user = {
    get_user_info: () => {},
    post_user_info: () => {},
    group_list: () => {},
    group_update: () => {},
    group_create: () => {},
    group_delete: () => {},
    get_group_temp: () => {},
    post_group_temp: () => {},
    get_group: () => {},
    get_service_group: () => {},
    get_character_profile: () => {},
    post_character_profile: () => {},
  };
  send: any = () => {};
  socket: any = {};
  fetch: any = () => {};
}

export default MoobiusBASIC;
