import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, NativeEventEmitter} from 'react-native';
import {PassbaseButton, PassbaseSDK} from '@passbase/react-native-passbase';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_passbase_id,
  action_insert_passbase_id,
} from '../../../Services/Actions/PassbaseActions';
import {Actions} from 'react-native-router-flux';
const PassbaseUI = () => {
  const passbase_public_key = useSelector(
    (state) => state.PassbaseReducers.passbase_public_key,
  );
  const dispatch = useDispatch();
  const {loading, setloading} = useState(false);
  const {initSucceed, setinitSucceed} = useState(false);
  const subscription = new NativeEventEmitter(PassbaseSDK);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  useEffect(() => {
    let mounted = true;
    const initializepassbase = () => {
      PassbaseSDK.initialize(passbase_public_key)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      subscription.addListener('onCompletePassbaseVerification', (event) => {
        dispatch(action_passbase_id(event.identityAccessKey));
        dispatch(
          action_insert_passbase_id(
            event.identityAccessKey,
            users_reducers?.username,
          ),
        );
      });
      subscription.addListener('onError', (event) => {
        console.log('##onError##', event);
      });
      subscription.addListener('onFinish', (event) => {
        dispatch(action_passbase_id(event.identityAccessKey));
        dispatch(
          action_insert_passbase_id(
            event.identityAccessKey,
            users_reducers?.username,
          ),
        );
        // Actions.update_address();
      });
      subscription.addListener('onSubmitted', (event) => {
        dispatch(action_passbase_id(event.identityAccessKey));
        dispatch(
          action_insert_passbase_id(
            event.identityAccessKey,
            users_reducers?.username,
          ),
        );
      });
      subscription.addListener('onStart', (event) => {
        console.log('##onStart##', event);
      });
      const res = PassbaseSDK.startVerification();
      if (res.success) {
        // successfully started verification
      }
    };
    mounted && initializepassbase();
    return () => {
      if (subscription)
        subscription.removeListener('onFinish', (event) => {
          console.log('##removing listener onFinish##', event);
        });
      subscription.removeListener('onSubmitted', (event) => {
        console.log('##removing listener onSubmitted##', event);
      });
      subscription.removeListener('onError', (event) => {
        console.log('##removing listener onError##', event);
      });
      subscription.removeListener('onStart', (event) => {
        console.log('##removing listener onStart##', event);
      });
      mounted = false;
    };
  }, [dispatch, passbase_public_key, users_reducers?.username]);
  const handlePassbaseClick = async () => {
    if (loading) {
      return;
    }
    if (initSucceed) {
      // Promise based method call
      const res = PassbaseSDK.startVerification();
      setloading(false);
      if (!res.success) {
        alert('something went wrong. while starting verification.');
      }
    } else {
      // promise based implementation
      const res = PassbaseSDK.initialize(passbase_public_key);
      console.log('initRes: ', res);
      if (res && res.success) {
        setinitSucceed(true);
        setloading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.button} onPress={handlePassbaseClick}>
        <Text style={styles.btnText}>
          {initSucceed ? 'start verification' : 'initialize SDK'}
        </Text>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </TouchableOpacity>
      {initSucceed && (
        <PassbaseButton style={{margin: 10, backgroundColor: 'white'}} />
      )} */}
    </View>
  );
};
export default PassbaseUI;
