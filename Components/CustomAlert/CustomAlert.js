import React, {useCallback, useEffect, useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_camera,
  action_imagepickeroptions,
} from '../../Services/Actions/Default_Actions';
import {TextInput} from 'react-native-paper';
import {action_alerted} from '../../Services/Actions/Default_Actions';
import {View} from 'react-native';
const CustomAlert = ({messageTitle, messageDescp, typeofAlert}) => {
  const dispatch = useDispatch();
  const alerted = useSelector((state) => state.Default_Reducers.alerted);
  const [alert, setalert] = useState(false);
  const [remarks, setremarks] = useState('');
  const handleCamera = useCallback(() => {
    dispatch(action_alerted(false));
    setTimeout(() => {
      dispatch(action_imagepickeroptions('launchCamera'));
    }, 1000);

    setalert(false);
  }, [dispatch]);
  const handleLibrary = useCallback(() => {
    dispatch(action_alerted(false));
    setTimeout(() => {
      dispatch(action_imagepickeroptions('launchImageLibrary'));
    }, 1000);

    setalert(false);
  }, [dispatch]);
  const handleRemarks = useCallback((e) => {
    setremarks(e);
  }, []);
  return (
    <AwesomeAlert
      show={alerted}
      showProgress={false}
      title={messageTitle}
      message={messageDescp}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Launch Camera"
      confirmText="Launch Library"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => handleCamera()}
      onConfirmPressed={() => handleLibrary()}
      //   customView={
      //     <View style={{height: 150, width: '100%'}}>
      //       <TextInput
      //         style={{height: 150}}
      //         theme={{
      //           colors: {
      //             primary: '#f7862a',
      //             backgroundColor: 'rgba(255,255,355,0.1)',
      //             underlineColor: 'rgba(255,255,355,0.4)',
      //             overflow: 'hidden',
      //           },
      //         }}
      //         mode="flat"
      //         multiline={true}
      //         label="If Yes Remarks (optional)"
      //         // secureTextEntry={true}
      //         onChangeText={(text) => handleRemarks(text)}
      //         value={remarks}
      //       />
      //     </View>
      //   }
    />
  );
};
export default CustomAlert;
