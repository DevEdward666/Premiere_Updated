import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CardView from 'react-native-rn-cardview';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from '../style';
import {
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_reaction,
  action_set_news_comment,
} from '../../../Services/Actions/NewsActions';
import wait from '../../../Plugins/waitinterval';
import {ACTION_NOTIF,action_SET_notications} from '../../../Services/Actions/DefaultActions';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import {useDispatch, useSelector} from 'react-redux';
const NewsComments = () => {
  const news_comments = useSelector(
    (state) => state.News_Reducers.data_comment,
  );
  const [news_id, setnews_id] = useState('');
  const [comment, setcomment] = useState('');
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  AsyncStorage.getItem('news_id').then((item) => {
    if (item == null) {
      Actions.home();
    } else {
      setnews_id(item);
    }
  });
  const onRefresh = useCallback(() => {
    let unmount = false;
    if (!unmount) {
      setRefreshing(true);
      wait(1000).then(() => {
        setRefreshing(false);
        dispatch(action_GET_news_comment(news_id.toString(), offset));
      });
    }
    return () => {
      unmount = true;
    };
  }, [dispatch, news_id]);
  const loadmore = useCallback(async () => {
    let unmount = false;
    if (!unmount) {
      setoffset((prev) => prev + 10);
      await dispatch(action_GET_news_comment(news_id.toString(), offset));
    }
    console.log('end');
    return () => {
      unmount = true;
    };
  }, [dispatch, offset]);
  const onChangeText = useCallback((text) => {
    let unmount = true;
    if (unmount) {
      setcomment(text);
    }
    return () => {
      unmount = false;
    };
  }, []);
  const handleCommentSend = useCallback(async () => {
    let unmount = false;
    if (!unmount) {
      if (comment !== ' ') {
        dispatch(
          action_set_news_comment(
            news_id.toString(),
            comment,
            users_reducers?.prem_id,
          ),
        );
        dispatch(action_GET_news_comment(news_id.toString(), offset));
        dispatch(
          action_SET_notications(
            users_reducers.firstname +
              ' ' +
              users_reducers.lastname +
              ' Commented',
            comment,
            'high',
            'all',
            users_reducers?.prem_id,
          ),
        );
        await dispatch(
          ACTION_NOTIF(
            users_reducers.prem_id + ' Commented',
            comment,
            'pgh',
            'Comment',
          ),
        );
        await setcomment('');
      }
    }
    return () => {
      unmount = true;
    };
  }, [dispatch, comment]);
  return (
    <SafeAreaView>
      <CardView>
        <View style={styles.containerNOTIFICATION}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 50,
            }}>
            <View style={{width: 320, height: 40}}>
              <TextInput
                style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                multiline
                placeholder="Comment"
                numberOfLines={4}
                onChangeText={(text) => onChangeText(text)}
                value={comment}
              />
            </View>
            <View style={{width: 50, height: 50}}>
              <Button
                style={{borderRadius: 25}}
                icon={<Icons name="arrow-right" size={20} color="white" />}
                onPress={() => handleCommentSend()}
              />
            </View>
          </View>
        </View>
      </CardView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={news_comments}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <CardView key={index}>
            <View style={styles.contentNOTIFICATION}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                  width: width,
                  maxHeight: height,
                }}>
                <View
                  style={{
                    width: '20%',
                    height: 50,
                    maxHeight: height,
                  }}>
                  <Image
                    source={{
                      uri: `${news_reducers_url}/${item?.img}`,
                    }}
                    style={{
                      marginTop: 10,
                      marginStart: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 120 / 2,
                      overflow: 'hidden',
                      borderWidth: 3,
                    }}
                  />
                </View>
                <View
                  style={{
                    padding: 5,
                    width: '90%',
                    maxHeight: height,
                  }}
                  key={index}>
                  <Text
                    style={{
                      maxHeight: height,
                      paddingStart: 5,
                      fontFamily: 'SFUIDisplay-Regular',
                    }}>
                    {item?.fullname}
                    {'\n'}
                    {item?.comment}
                  </Text>
                </View>
              </View>
            </View>
          </CardView>
        )}
      />
      {/* {news_comments.map((Notification) => {
        return (
          
        );
      })} */}
    </SafeAreaView>
  );
};
export default NewsComments;
