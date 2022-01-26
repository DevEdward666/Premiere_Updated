import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import EventCard from './EventCard';
import styles from './style';
import {action_GET_events} from '../../../Services/Actions/Events_Actions';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
const EvetsListUI = () => {
  const dispatch = useDispatch();
  const events_reducers = useSelector(
    (state) => state.Events_Reducers.eventsdata,
  );
  const events_reducers_url = useSelector((state) => state.News_Reducers.url);



  return (
    <SafeAreaView>
      {events_reducers?.length <= 0 ? (
        <Card style={{flex: 1, borderRadius: 15, marginEnd: 5, padding: 10}}>
          <Card.Title
            style={styles.EventListTitleThin}
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
            source={require('../../../assets/icons/events_calendar.png')}
          />
          <Card.Content>
            <Title style={styles.EventListTitleThin}>
              No new upcomming events
            </Title>
          </Card.Content>
        </Card>
      ) : (
        <FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          style={styles.container}
          data={events_reducers}
          keyExtractor={(item, index) => item?.evid}
          // onEndReached={loadmore}

          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <TouchableHighlight
              key={index}
              // onPress={() => gotoevents(e)}
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
          )}
          ListHeaderComponent={
            <View style={{flexDirection: 'row',backgroundColor:"white"}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    marginStart: 15,
                    textAlign: 'left',
                    fontSize: 36,
                    fontFamily: 'SFUIDisplay-Bold',
                  }}>
                  Events
                </Text>
              </View>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};
export default EvetsListUI;
