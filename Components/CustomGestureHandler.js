import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const CustomGestureHandler = ({down, UI}) => {
  const [gestureName, setgestureName] = useState('');
  const [swipedown, setswipedown] = useState(false);
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setswipedown(down);
        break;
      case SWIPE_LEFT:
        setswipedown(down);
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        setswipedown(down);
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      config={config}>
      {UI}
    </GestureRecognizer>
  );
};

CustomGestureHandler.propTypes = {};

export default CustomGestureHandler;
