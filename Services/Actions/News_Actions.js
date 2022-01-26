import { BASE_URL } from "../Types/Default_Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SET_DATA,
  SET_DATA_WEEK,
  SET_DATA_TODAY,
  SET_DATA_INFO,
  GET_NEWS_COMMENT,
  GET_NEWS_REACTION,
  BASE64_IMAGE,
  SET_NEWS_IMAGE,
  GET_NEWS_ID,
} from "../Types/News_Types";
import RNFetchBlob from "react-native-fetch-blob";
// import {fetchwithdispatch} from '../middleware/api';

// export const action_GET_news = (offset) => {
//   return (dispatch) => {
//     return fetchwithdispatch('/api/news/getallnews', offset)
//       .then((response) => response.json())
//       .then(async (res) => {
//         try {
//           responseData = await response.json();
//         } catch (e) {
//           return dispatch({
//             type: reducer,
//             payload: res.data,
//           });
//         }
//       });
//   };
// };
export const convert_to_base64 = (url) => async (dispatch) => {
  await RNFetchBlob.fetch("GET", url, {}).then(async (res) => {
    let base64Str = res.base64();
    try {
      responseData = await response.json();
    } catch (e) {}
    dispatch({
      type: BASE64_IMAGE,
      payload: base64Str,
    });
    let text = res.text();
    let json = res.json();
  });
};
export const action_GET_news = (offset) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnews`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
    });
};
export const action_GET_news_images = (news_id) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnewsimages`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      news_id: news_id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_NEWS_IMAGE,
        payload: { data: res.data, success: res.success },
      });
    });
};
export const action_GET_news_info = (id) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnewsinfo`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: SET_DATA_INFO,
        payload: { data: res.data, loading: true },
      });
    });
};

export const action_set_news_reaction =
  (id, reaction, reactedby) => async (dispatch) => {
    var url = `${BASE_URL}/api/news/InsertReactionNews`;
    const value = await AsyncStorage.getItem("tokenizer");
    const bearer_token = value;
    const bearer = "Bearer " + bearer_token;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        news_id: id,
        reaction: reaction,
        reactedby: reactedby,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
      });
  };

export const action_set_news_comment =
  (id, comment, commentedby) => async (dispatch) => {
    var url = `${BASE_URL}/api/news/InsertCommentNews`;
    const value = await AsyncStorage.getItem("tokenizer");
    const bearer_token = value;
    const bearer = "Bearer " + bearer_token;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        news_id: id,
        comment: comment,
        commentedby: commentedby,
      }),
    })
      .then((response) => response.json())
      .then((res) => {});
  };

export const action_GET_news_comment = (id, offset) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnewscoment`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      news_id: id,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_NEWS_COMMENT,
        payload: res.data,
      });
    });
};

export const action_GET_news_reaction = (id) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnewsreaction`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      news_id: id,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_NEWS_REACTION,
        payload: res.data,
      });
    });
};
export const action_GET_news_week = (offset) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnewsweek`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: SET_DATA_WEEK,
        payload: res.data,
      });
    });
};

export const action_GET_news_today = (offset) => async (dispatch) => {
  var url = `${BASE_URL}/api/news/getallnewstoday`;
  const value = await AsyncStorage.getItem("tokenizer");
  const bearer_token = value;
  const bearer = "Bearer " + bearer_token;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: SET_DATA_TODAY,
        payload: res.data,
      });
    });
};

export const action_SET_news_id = (id) => async (dispatch) => {
  dispatch({
    type: GET_NEWS_ID,
    payload: id,
  });
};
