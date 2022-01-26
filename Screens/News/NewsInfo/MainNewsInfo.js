import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_news_images,
  action_GET_news_info,
  action_GET_news_comment,
} from '../../../Services/Actions/News_Actions';
import NewsInfo from './NewsInfo';
const MainInfo = () => {
  const dispatch = useDispatch();
  const news_id = useSelector((state) => state.News_Reducers.news_id);

  useEffect(() => {
    let mounted = true;
    const getnewsinfo = async () => {
      if (mounted) {
         dispatch(action_GET_news_info(news_id));
         dispatch(action_GET_news_images(news_id));
         dispatch(action_GET_news_comment(news_id, 10));
      }
    };

    mounted && getnewsinfo();
    return () => {
      mounted = false;
    };
  }, [news_id]);
  return <NewsInfo />;
};
export default MainInfo;
