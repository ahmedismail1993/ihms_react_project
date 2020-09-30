import request from '../axiosConfig/index';

export const IndexData = ({ resource, query }) => {
  return request({
    url: `api/${resource}`,
    method: 'get',
    params: {
      ...query,
    },
  });
};

export const StoreData = ({ resource, data }) => {
  return request({
    url: `api/${resource}`,
    method: 'post',
    data,
  });
};
