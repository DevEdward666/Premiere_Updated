import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Animated,
  Dimensions,
  View,
  Image,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import EventCard from './EventCard';
import styles from './style';
import {action_GET_events} from '../../../Services/Actions/Events_Actions';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
const EvetsListUI = () => {
  const {width, height} = Dimensions.get('window');
  const SPACING = 10;
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 1;
  const EMPTY_ITEM_SIZE = width - ITEM_SIZE / 2;
  const BACKDROP_HEIGHT = height * 0.65;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const events_reducers = useSelector(
    (state) => state.Events_Reducers.eventsdata,
  );
  const events_reducers_url = useSelector((state) => state.News_Reducers.url);
  useEffect(() => {
    let mounted = true;
    const getevents = () => {
      if (mounted) {
        dispatch(action_GET_events());
      }
    };
    mounted && getevents();
    return()=>{
      mounted =false;
    }
  }, [dispatch]);
  return (
    <SafeAreaView>
      {events_reducers?.length <= 0 ? (
        <Card style={{flex: 1, borderRadius: 15, marginEnd: 5, padding: 10}}>
          <Card.Title style={styles.EventListTitle} title={''} subtitle={''} />
          <Image
            style={{
              resizeMode: 'center',
              height: 150,
              width: 150,
              alignSelf: 'center',
            }}
            source={require('../../../assets/icons/events_calendar.png')}
          />
          <Card.Content>
            <Title style={styles.EventListTitleThin}>
              No new upcomming events
            </Title>
            <Paragraph style={styles.EventListTitle}></Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Animated.FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          style={styles.container}
          data={events_reducers}
          keyExtractor={(item, index) => item?.evid}
          // onEndReached={loadmore}
          horizontal={true}
          onEndReachedThreshold={0.1}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          snapToInterval={ITEM_SIZE}
          decelerationRate={1}
          bounces={true}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={26}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, 0, 0],
              extrapolate: 'clamp',
            });
            return (
              <View style={{width: ITEM_SIZE}}>
                <Animated.View
                  key={item?.id}
                  style={{
                    alignItems: 'center',
                    borderRadius: 20,
                    transform: [{translateY}],
                  }}>
                  <TouchableHighlight
                    style={{flex: 1}}
                    key={index}
                    onPress={() => gotoevents(e)}
                    underlayColor="white">
                    <EventCard
                      title={item?.evtitle}
                      description={item?.evdesc}
                      image={`${events_reducers_url}/${item?.evimage}`}
                      day={moment(`${item?.datestart}`).format('D')}
                month={moment(`${item?.datestart}`).format('MMM')}
                year={moment(`${item?.datestart}`).format('YYYY')}
                      time={`From: ${moment(
                        ` ${item?.datestart} ${item?.evstarttime}`,
                      ).format('hh:mm a')} To: ${moment(
                        ` ${item?.dateend} ${item?.evendtime}`,
                      ).format('hh:mm a')} `}
                    />
                  </TouchableHighlight>
                </Animated.View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default EvetsListUI;
