import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Badge, Button, ButtonGroup } from "react-native-elements";
import { ScrollView, TextInput } from "react-native-gesture-handler";
// import CardView from "react-native-rn-cardview";
import { Card, HelperText, Paragraph, Title } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icons from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import CustomBottomSheet from "../../Components/CustomeBottomSheet";
import NewsCard from "../../Components/NewsCard/NewsCard";
import { action_open_bottomsheet } from "../../Services/Actions/Default_Actions";
import MainTestimonials from "../Testimonials/MainTestimonials";
import {
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_comment,
  action_SET_news_id,
  action_set_news_reaction,
} from "../../Services/Actions/News_Actions";
import styles from "./style";
import NewsCarousel from "./NewsCarousel";
import MainEvents from "../Calendar/Events/MainEvents";
import { action_GET_events } from "../../Services/Actions/Events_Actions";
function NewsMain(props) {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 1;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [offset, setoffset] = useState(10);
  const [offsetcomment, setoffsetcomment] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  const [posts_id, setposts_id] = useState("");
  const [comment, setcomment] = useState("");
  const [isVisibleError, setisVisibleError] = useState(false);
  const news_reducers = useSelector((state) => state.News_Reducers.data);
  const users_reducers = useSelector(
    (state) => state.Default_Reducers.userinfo
  );
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const open_bottomsheet = useSelector(
    (state) => state.Default_Reducers.bottomSheet
  );
  const news_comments = useSelector(
    (state) => state.News_Reducers.data_comment
  );
  const [token, settoken] = useState("");
  const loadasyncstorage = async () => {
    let prem_token = await AsyncStorage.getItem("tokenizer");
    if (prem_token !== null) {
      setloggedin(true);
    } else {
      setloggedin(false);
    }
  };
  useEffect(() => {
    let mounted = true;
    const loaded = async () => {
      if (mounted) {
        setisVisibleError(false);
        loadasyncstorage();
      }
    };
    mounted && loaded();
    return () => {
      settoken();
      mounted = false;
    };
  }, []);

  const onRefresh = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setRefreshing(true);
      dispatch(action_GET_news(offset));
      await setRefreshing(false);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getnews = async () => {
      if (mounted) {
        dispatch(action_open_bottomsheet(false));
        dispatch(action_GET_news(offset));
      }
    };
    mounted && getnews();
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  const loadmoreComments = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setoffsetcomment((prev) => prev + 10);
      dispatch(action_GET_news_comment(item?.id.toString(), offsetcomment));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  const loadmore = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setoffset((prev) => prev + 10);
      dispatch(action_GET_news(offset));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);

  const gotonewsinfo = useCallback(
    async (item) => {
      let mounted = true;
      if (mounted) {
        dispatch(action_SET_news_id(item?.id));

        await Actions.news_info();
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch]
  );
  const onChangeText = useCallback(
    (text) => {
      let mounted = true;
      if (mounted) {
        if (loggedin) {
          setcomment(text);
          setisVisibleError(false);
        } else {
          setisVisibleError(true);
          setcomment("");
        }
      }
      return () => {
        mounted = false;
      };
    },
    [loggedin]
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
              "Like",
              users_reducers?.prem_id
            )
          );
          dispatch(action_GET_news_reaction(item?.id));
          dispatch(action_GET_news(offset));
        }
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch]
  );
  const handleCommentSend = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      if (loggedin) {
        if (comment !== " ") {
          dispatch(
            action_set_news_comment(
              posts_id.toString(),
              comment,
              users_reducers?.prem_id
            )
          );
          dispatch(action_GET_news_comment(posts_id.toString()));

          await setcomment("");
        }
        setisVisibleError(false);
      } else {
        setisVisibleError(true);
        setcomment("");
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, comment, loggedin]);
  const handleGotoEvents=useCallback(async()=>{
    dispatch(action_GET_events());
    await Actions.seemoreevents()
  },[dispatch])
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
  const buttons = [{ element: component1 }, { element: component2 }];

  return (
    <ScrollView style={styles.container}>
      <NewsCarousel />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              flex: 1,
              color: "black",
              marginStart: 15,
              textAlign: "left",
              fontSize: 36,
              fontFamily: "SFUIDisplay-Bold",
            }}
          >
            Events
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          onPress={() => handleGotoEvents()}
          underlayColor="white"
        >
          <Text
            style={{
              flex: 1,
              color: "black",
              marginStart: 30,
              alignSelf: "flex-end",
              textAlign: "right",
              fontSize: 12,
              marginEnd: 15,
              marginBottom: 30,
              fontFamily: "SFUIDisplay-Bold",
            }}
          >
            See More
          </Text>
        </TouchableHighlight>
      </View>
      <MainEvents />
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                flex: 1,
                color: "black",
                marginStart: 15,
                textAlign: "left",
                fontSize: 36,
                fontFamily: "SFUIDisplay-Bold",
              }}
            >
              News
            </Text>
          </View>
        </View>
      </View>
      {news_reducers.length <= 0 ? (
        <Card style={{ flex: 1, borderRadius: 15, marginEnd: 5, padding: 10 }}>
          <Card.Title style={styles.EventListTitle} title={""} subtitle={""} />
          <Image
            style={{
              resizeMode: "center",
              height: 150,
              width: 150,
              alignSelf: "center",
            }}
            source={require("../../assets/icons/newspaper.jpg")}
          />
          <Card.Content>
            <Title style={styles.EventListTitleThin}>
              No new news for today
            </Title>
            <Paragraph style={styles.EventListTitle}></Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <TouchableHighlight
              onPress={() => Actions.newslist()}
              underlayColor="white"
            >
              <Text
                style={{
                  flex: 1,
                  color: "black",
                  marginStart: 30,
                  alignSelf: "flex-end",
                  textAlign: "right",
                  fontSize: 12,
                  marginEnd: 15,
                  fontFamily: "SFUIDisplay-Bold",
                }}
              >
                See More
              </Text>
            </TouchableHighlight>
          </View>
          <Animated.FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            horizontal={true}
            style={styles.container}
            data={news_reducers}
            onEndReached={loadmore}
            onEndReachedThreshold={0.1}
            onEndReachedThreshold={0.1}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              alignItems: "center",
            }}
            snapToInterval={ITEM_SIZE}
            decelerationRate={1}
            bounces={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={26}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ];
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [0, 0, 0],
                extrapolate: "clamp",
              });
              return (
                <TouchableHighlight
                  onPress={() => gotonewsinfo(item)}
                  key={index}
                  underlayColor="white"
                >
                  <NewsCard
                    title={item.Title}
                    img={`${news_reducers_url}/${item.Image}`}
                    description={item.description}
                    UI={
                      <>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              flex: 3,
                              justifyContent: "flex-start",
                            }}
                          >
                            <View
                              style={{
                                width: 30,
                                marginBottom: -30,
                                marginStart: 25,
                              }}
                            >
                              <Icons name="thumbs-up" size={25} color="grey" />
                            </View>
                            <View style={{ width: 80, marginStart: 10 }}>
                              <Badge status="primary" value={item?.likes} />
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,

                              justifyContent: "flex-end",
                            }}
                          >
                            <View style={{ paddingBottom: 1 }}>
                              <Text>
                                Comments <Text>{item?.totalcomments}</Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                        <ButtonGroup
                          onPress={(index) => updateIndex(item, index)}
                          buttons={buttons}
                          containerStyle={{ height: 35, marginTop: 25 }}
                        />
                      </>
                    }
                  />
                </TouchableHighlight>
              );
            }}
          />
        </>
      )}
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                flex: 1,
                color: "black",
                marginStart: 30,
                textAlign: "left",
                fontSize: 36,
                fontFamily: "SFUIDisplay-Bold",
              }}
            >
              Testimonials
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <MainTestimonials />
        </View>
      </View>
      <CustomBottomSheet
        isVisible={open_bottomsheet}
        color="white"
        UI={
          <View style={{ flex: 1 }}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={styles.container}
              data={news_comments}
              keyExtractor={(comments, index) => index.toString()}
              onEndReached={loadmoreComments}
              onEndReachedThreshold={0.1}
              renderItem={({ item, index }) => (
                <Card key={index} style={{ paddingTop: 20, paddingBottom: 20 }}>
                  <View style={styles.contentNOTIFICATION}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: width,
                      }}
                    >
                      <View
                        style={{
                          width: "20%",
                          height: 50,
                          maxHeight: height,
                        }}
                      >
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
                            overflow: "hidden",
                            borderWidth: 3,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          padding: 5,
                          width: "90%",
                          maxHeight: height,
                        }}
                        key={index}
                      >
                        <Text
                          style={{
                            maxHeight: height,
                            paddingStart: 5,
                          }}
                        >
                          {item?.fullname}
                          {"\n"}
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
                <SafeAreaView style={{ flex: 1 }}>
                  <HelperText type="error" visible={isVisibleError}>
                    You need to be logged in to use this function
                  </HelperText>
                  <View style={styles.containerComment}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginBottom: 50,
                      }}
                    >
                      <View style={{ width: "85%", height: 40 }}>
                        <TextInput
                          style={{ borderWidth: 2, borderColor: "#f7f5f5" }}
                          multiline
                          placeholder="Type a comment here"
                          numberOfLines={4}
                          onChangeText={(text) => onChangeText(text)}
                          value={comment}
                        />
                      </View>
                      <View style={{ width: 60, height: 50 }}>
                        <View
                          style={{
                            width: "100%",
                            borderRadius: 30,
                            overflow: "hidden",
                          }}
                        >
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
    </ScrollView>
  );
}

export default NewsMain;
