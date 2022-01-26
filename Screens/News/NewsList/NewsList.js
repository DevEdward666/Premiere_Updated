import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Platform,
} from 'react-native';
import {Badge, Button, ButtonGroup} from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {HelperText} from 'react-native-paper';
// import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import CustomBottomSheet from '../../../Components/CustomeBottomSheet';
import {
  ACTION_NOTIF,
  action_open_bottomsheet,
  action_SET_notications,
} from '../../../Services/Actions/Default_Actions';
import {
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_comment,
  action_SET_news_id,
  action_set_news_reaction,
} from '../../../Services/Actions/News_Actions';
import NewsCard from '../../../Components/NewsCard/NewsCard';
import styles from '../style';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';

const NewsList = () => {
  const {width, height} = Dimensions.get('window');
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 1;
  const [offset, setoffset] = useState(10);
  const [offsetcomment, setoffsetcomment] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [posts_id, setposts_id] = useState('');
  const [comment, setcomment] = useState('');
  const [isVisibleError, setisVisibleError] = useState(false);

  const dispatch = useDispatch();
  const news_reducers = useSelector(state => state.News_Reducers.data);
  const users_reducers = useSelector(
    state => state.User_Reducers.userinfo.data,
  );
  const news_reducers_url = useSelector(state => state.News_Reducers.url);
  const open_bottomsheet = useSelector(
    state => state.Default_Reducers.bottomSheet,
  );
  const news_comments = useSelector(state => state.News_Reducers.data_comment);
  const [loggedin, setloggedin] = useState(false);
  const [token, settoken] = useState('');

  useEffect(() => {
    let mounted = true;
    const loaded = async () => {
      if (mounted) {
        setisVisibleError(false);
        try {
          const prem_token = AsyncStorage.getItem('tokenizer');
          await AsyncStorage.getItem('tokenizer').then(item => {
            settoken(item);
          });
          if (prem_token !== null) {
            setloggedin(true);
          } else {
            setloggedin(false);
          }
        } catch (error) {

        }

       
      }
    };
    mounted && loaded();
    return () => {
      mounted = false;
    };
  }, []);

  const onRefresh = useCallback(() => {
    let mounted = true;
    if (mounted) {
      setRefreshing(true);

      dispatch(action_GET_news(offset));
      setRefreshing(false);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getnews = () => {
      dispatch(action_open_bottomsheet(false));
      dispatch(action_GET_news(offset));
    };
    mounted && getnews();
    return () => {
      mounted = false;
    };
  }, []);
  const loadmoreComments = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setoffsetcomment(prev => prev + 10);
      dispatch(action_GET_news_comment(item?.id.toString(), offsetcomment));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  const loadmore = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setoffset(prev => prev + 10);
      await dispatch(action_GET_news(offset));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);

  const gotonewsinfo = useCallback(
    async item => {
      let mounted = true;
      if (mounted) {
        dispatch(action_SET_news_id(item.id));

        await Actions.news_info();
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch],
  );
  const onChangeText = useCallback(
    text => {
      let mounted = true;
      if (mounted) {
        if (loggedin) {
          setcomment(text);
          setisVisibleError(false);
        } else {
          setisVisibleError(true);
          setcomment('');
        }
      }
      return () => {
        mounted = false;
      };
    },
    [loggedin],
  );

  const updateIndex = useCallback(
    async (item, index) => {
      let mounted = true;

      if (mounted) {
        await setposts_id(item?.id);
        dispatch(action_GET_news_comment(item?.id.toString(), 10));

        if (index !== 0) {
          dispatch(action_open_bottomsheet(true));
        } else {
          dispatch(
            action_set_news_reaction(
              item?.id.toString(),
              'Like',
              users_reducers?.prem_id,
            ),
          );
          dispatch(action_GET_news_reaction(item?.id));
          dispatch(action_GET_news(offset));
        }
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch],
  );
  const handleCommentSend = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      if (loggedin) {
        if (comment !== ' ') {
          dispatch(
            action_set_news_comment(
              posts_id.toString(),
              comment,
              users_reducers?.prem_id,
            ),
          );
          dispatch(action_GET_news_comment(posts_id.toString()));

          await setcomment('');
        }
        setisVisibleError(false);
      } else {
        setisVisibleError(true);
        setcomment('');
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, comment, loggedin]);
  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="thumbs-up" size={15} color="grey" /> Like
        </Text>
      </>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icons name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{flexDirection: 'column'}}>
        {news_reducers.length > 0 ? (
          <View style={{marginTop: 5}}>
          
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={styles.flatlistcontainer}
              data={news_reducers}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={loadmore}
              onEndReachedThreshold={0.1}
              // onScroll={() => HideHeader()}
              renderItem={({item, index}) => (
                <TouchableHighlight
                key={index}
                  onPress={() => gotonewsinfo(item)}
                  underlayColor="white">
                  <NewsCard
                    title={item.Title}
                    img={`${news_reducers_url}/${item.Image}`}
                    description={item.description}
                    // UI={
                    //   <>
                    //     <View
                    //       style={{
                    //         flexDirection: 'row',
                    //         flex: 1,
                    //         alignItems: 'center',
                    //       }}>
                    //       <View
                    //         style={{
                    //           flex: 2,
                    //           justifyContent: 'flex-start',
                    //         }}>
                    //         <View
                    //           style={{
                    //             width: 30,
                    //             marginBottom: -20,
                    //             marginStart: 20,
                    //           }}>
                    //           <Icons name="thumbs-up" size={15} color="grey" />
                    //         </View>
                    //         <View style={{width: 80}}>
                    //           <Badge status="primary" value={item?.likes} />
                    //         </View>
                    //       </View>
                    //       <View
                    //         style={{
                    //           flex: 1,
                    //           justifyContent: 'flex-end',
                    //         }}>
                    //         <View style={{flex: 1, padding: 4}}>
                    //           <Text>
                    //             Comments <Text>{item?.totalcomments}</Text>
                    //           </Text>
                    //         </View>
                    //       </View>
                    //     </View>
                    //     <ButtonGroup
                    //       onPress={index => updateIndex(item, index)}
                    //       buttons={buttons}
                    //       containerStyle={{height: 35, marginBottom: 15}}
                    //     />
                    //   </>
                    // }
                  />
                </TouchableHighlight>
              )}
            />
          </View>
        ) : (
          <Card style={{flex: 1, borderRadius: 15, marginEnd: 5, padding: 10}}>
            <Card.Title
              style={styles.EventListTitle}
              title={''}
              subtitle={''}
            />
            <Image
              style={{
                resizeMode: 'center',
                height: 150,
                width: 150,
                alignSelf: 'center',
              }}
              source={require('../../../assets/icons/newspaper.jpg')}
            />
            <Card.Content>
              <Title style={styles.EventListTitleThin}>
                No new news for today
              </Title>
              <Paragraph style={styles.EventListTitle}></Paragraph>
            </Card.Content>
          </Card>
        )}
      </View>
      <CustomBottomSheet
        isVisible={open_bottomsheet}
        color="white"
        UI={
          <View style={{flex: 1}}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={styles.container}
              data={news_comments}
              keyExtractor={(comments, index) => index.toString()}
              onEndReached={loadmoreComments}
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => (
                <Card
                  key={index}
                  style={{paddingTop: 20, paddingBottom: 20}}>
                  <View style={styles.contentNOTIFICATION}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: width,
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
                          }}>
                          {item?.fullname}
                          {'\n'}
                          {item?.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              )}
              ListHeaderComponent={
                <View style={styles.containerNOTIFICATION}>
                  <Text>Comments</Text>
                </View>
              }
              ListFooterComponent={
                <SafeAreaView style={{flex: 1}}>
                  <HelperText type="error" visible={isVisibleError}>
                    You need to be logged in to use this function
                  </HelperText>
                  <View style={styles.containerComment}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 50,
                      }}>
                      <View style={{width: '85%', height: 40}}>
                        <TextInput
                          style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                          multiline
                          placeholder="Type a comment here"
                          numberOfLines={4}
                          onChangeText={text => onChangeText(text)}
                          value={comment}
                        />
                      </View>
                      <View style={{width: 60, height: 50}}>
                        <View
                          style={{
                            width: '100%',
                            borderRadius: 30,
                            overflow: 'hidden',
                          }}>
                          <Button
                            icon={
                              <Icons
                                name="arrow-right"
                                size={20}
                                color="white"
                              />
                            }
                            onPress={() => handleCommentSend()}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </SafeAreaView>
              }
            />
          </View>
        }
      />
    </View>
  );
};

export default NewsList;
