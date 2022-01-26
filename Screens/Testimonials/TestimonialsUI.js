import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Dimensions,
  Platform,
  Animated,
  View,
} from 'react-native';

import styles from './style';
import {action_GET_testimonials} from '../../Services/Actions/Default_Actions';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import TestimonialsCard from './TestimonialsCard';
const TestimonialsUI = () => {
  const {width, height} = Dimensions.get('window');
  const SPACING = 10;
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 1;
  const EMPTY_ITEM_SIZE = width - ITEM_SIZE / 2;
  const BACKDROP_HEIGHT = height * 0.65;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const settestimonials = useSelector(
    (state) => state.Default_Reducers.settestimonials,
  );
  const events_reducers_url = useSelector((state) => state.News_Reducers.url);

  useEffect(() => {
    let mounted = true;
    const gettestimonials = () => {
      if (mounted) {
        dispatch(action_GET_testimonials());
      }
    };
    mounted && gettestimonials();
    return()=>{
      mounted=false;
    }
  }, [dispatch]);

  return (
    <SafeAreaView>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={settestimonials}
        keyExtractor={(item, index) => item?.id}
        horizontal={true}
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
            outputRange: [0, -50, 0],
            extrapolate: 'clamp',
          });
          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                key={item?.id}
                style={{
                  padding: SPACING * 10,
                  alignItems: 'center',
                  borderRadius: 20,
                  transform: [{translateY}],
                }}>
                <TestimonialsCard
                  description={item?.description}
                  image={`${events_reducers_url}/Resources/Testimonials/Quote.png`}
                  author={item?.author}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default TestimonialsUI;
