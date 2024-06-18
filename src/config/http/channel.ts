export const Create = (channel_name: string, channel_description: string) => ({
  url: '/channel/create',
  method: 'POST',
  data: {
    channel_name,
    context: {
      channel_description,
    },
  },
});

export const Update = (channel_id: string, channel_name: string) => ({
  url: '/channel/update',
  method: 'POST',
  data: {
    channel_id,
    channel_name,
  },
});

export const Popular = () => ({
  url: '/channel/popular',
  method: 'GET',
});

export const List = () => ({
  url: '/channel/list',
  method: 'GET',
});

/** **********
 * [history]
 */

export const HistoryMessage = async (params: {
  channel_id: string;
  before?: number; // 时间戳 s
  after?: number; // 时间戳 s
  limit: number;
}) => {
  params.before === 0
    ? delete params.before
    : (params.before = params.before! / 1000);
  params.after === 0
    ? delete params.after
    : (params.after = params.after! / 1000);
  return {
    url: '/channel/history_message',
    method: 'GET',
    data: params,
  };
};
