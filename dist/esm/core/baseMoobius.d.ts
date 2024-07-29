import type { MoobiusBasicConfig } from '@/index.d';
declare class MoobiusBASIC {
    defaults: MoobiusBasicConfig;
    config: MoobiusBasicConfig;
    auth: {
        sign_up: () => void;
        sign_in: () => void;
        sign_out: () => void;
        refresh: () => void;
        confirm_sign_up: () => void;
        resend_confirmation: () => void;
        confirm_reset_password: () => void;
        forgot_password: () => void;
    };
    channel: {
        create: () => void;
        update: () => void;
        popular: () => void;
        list: () => void;
        history_message: () => void;
    };
    file: {};
    user: {
        get_user_info: () => void;
        post_user_info: () => void;
        group_list: () => void;
        group_update: () => void;
        group_create: () => void;
        group_delete: () => void;
        get_group_temp: () => void;
        post_group_temp: () => void;
        get_group: () => void;
        get_service_group: () => void;
        get_character_profile: () => void;
        post_character_profile: () => void;
    };
    send: any;
    socket: any;
    fetch: any;
}
export default MoobiusBASIC;
