import React from 'react';
import styles from './style';
import {View, Text} from 'react-native';
import moment from 'moment';
import {MaskedText} from 'react-native-mask-text';
import {Card} from 'react-native-paper';
const GcashHeader = ({
  request_code,
  requestor_name,
  requested_on,
  consultation_cost,
}) => {
  return (
    <Card style={styles.cardContainer}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            padding: 10,
          },
        ]}>
        <View style={{flex: 1}}>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <View style={{flex: 3}}>
              <Text style={{fontSize: 12, fontFamily: 'SFUIDisplay-Regular'}}>
                Order No.
              </Text>
            </View>
            <View style={{flex: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'SFUIDisplay-Regular',
                  textAlign: 'right',
                }}>
                {request_code}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 3}}>
              <Text style={{fontSize: 12, fontFamily: 'SFUIDisplay-Regular'}}>
                Requestor Name:
              </Text>
            </View>
            <View style={{flex: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'SFUIDisplay-Regular',
                  textAlign: 'right',
                }}>
                {requestor_name}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 3}}>
              <Text style={{fontSize: 12, fontFamily: 'SFUIDisplay-Regular'}}>
                Requested On
              </Text>
            </View>
            <View style={{flex: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'SFUIDisplay-Regular',
                  textAlign: 'right',
                }}>
                {moment(requested_on).format('MMMM D, YYYY')}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 5, marginTop: 15}}>
              <Text style={{fontSize: 14, fontFamily: 'SFUIDisplay-Bold'}}>
                Total Cost
              </Text>
            </View>
            <View style={{flex: 3, marginTop: 15}}>
              <MaskedText
                style={{textAlign: 'right'}}
                type="currency"
                options={{
                  prefix: '₱',
                  decimalSeparator: '.',
                  precision: 0,
                }}>
                {consultation_cost}
              </MaskedText>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
export default GcashHeader;
