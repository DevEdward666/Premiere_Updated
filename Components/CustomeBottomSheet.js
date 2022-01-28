import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
import {Card} from 'react-native-elements/dist/card/Card';
// import CardView from 'react-native-rn-cardview';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import  {action_open_bottomsheet} from '../Services/Actions/Default_Actions'
import {useDispatch, useSelector} from 'react-redux'
const CustomBottomSheet = ({isVisible, color, UI, Footer}) => {

  const [gestureName, setgestureName] = useState('');
  const dispatch=useDispatch()
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        dispatch(action_open_bottomsheet(false))
        break;
      case SWIPE_LEFT:
        dispatch(action_open_bottomsheet(false))
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        dispatch(action_open_bottomsheet(false))
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  },[isVisible,dispatch]);
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };

  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}>
    <BottomSheet
      isVisible={isVisible}
      modalProps={{animationType: 'slide'}}
      containerStyle={{backgroundColor: color}}>
      {UI}
{Footer===undefined? null:<Card>{Footer}</Card>}
     
    </BottomSheet>
    </GestureRecognizer>

  );
};

CustomBottomSheet.propTypes = {};

export default CustomBottomSheet;
