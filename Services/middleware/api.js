import {BASE_URL} from '../Types/Default_Types';

export const fetchwithdispatch = async ({apiurl, body}) => {
  var url = `${BASE_URL}${apiurl}`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
