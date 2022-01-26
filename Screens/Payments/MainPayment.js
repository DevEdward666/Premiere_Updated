import React, {useCallback, useEffect} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { useDispatch,useSelector } from 'react-redux';
import styles from './style';
const MainPayment = () => {
  const dispatch=useDispatch();
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message,
  );
  const paycard = useCallback(() => {
    Actions.cardpayment();
  }, []);
  const paygcash = useCallback(() => {
  
    Actions.gcashpayment();
  }, []);
  const gotoinfo = () => {
    Actions.consultinfo();
  };
  const paygrabpay = useCallback(() => {
    Actions.grabpayment();
  }, []);
  const paymaya = useCallback(() => {
    Actions.paymayapayment();
  }, []);
  // useEffect(()=>{
  //   let mounted =true
  //   const getselectedlog=()=>{
  //     if(mounted){
  //       dispatch(action_selected_log(selected_log?.orderno));
  //     }
  //   }
  //   mounted && getselectedlog()
  // },[])
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          {/* <TouchableHighlight onPress={() => gotoinfo()} underlayColor="white">
            <Card containerStyle={styles.plate}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Consultation Info
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../../assets/icons/spoon.png')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight> */}
          <TouchableHighlight onPress={() => paycard()} underlayColor="white">
            <Card containerStyle={styles.plate}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Pay Via Card
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../../assets/icons/card.png')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => paygcash()} underlayColor="white">
            <Card containerStyle={styles.plate}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Pay Via Gcash
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 100,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../../assets/icons/gcash.png')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => paygrabpay()}
            underlayColor="white">
            <Card containerStyle={styles.plate}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Pay Via GrabPay
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 80,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 100,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../../assets/icons/grab.png')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => paymaya()}
            underlayColor="white">
            <Card containerStyle={styles.plate}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Pay Via PayMaya
                  </Text>
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 80,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../../assets/icons/paymaya.jpg')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};
export default MainPayment;
