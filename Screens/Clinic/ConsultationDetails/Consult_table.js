import React, {useCallback, useState} from 'react';
import {TouchableOpacity, TouchableHighlight, Image} from 'react-native';
import {Dimensions} from 'react-native';
import {View, Text, RefreshControl, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  LoadMoreTable,
  consultation_table,
  consultation_dtls,
} from '../../../Services/Actions/Clinic_actions';
import styles from './styles';
const Consult_table = () => {
  const Screenwidth = Dimensions.get('window').width;
  const Screenheight = Dimensions.get('window').height;

  const [refreshing, setrefreshing] = useState(false);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const consultation_tables = useSelector(
    (state) => state.Clinic_Reducers.consultation_table,
  );
  const offset = useSelector(
    (state) => state.Clinic_Reducers.consultation_table_offset,
  );
  const consult_status = useSelector(
    (state) => state.Clinic_Reducers.consult_status,
  );
  const dispatch = useDispatch();
  const onRefresh = useCallback(() => {
    setrefreshing(true);
    dispatch(
      consultation_table(users_reducers?.prem_id, consult_status, offset),
    );
    setrefreshing(false);
  }, [dispatch, users_reducers?.prem_id, consult_status, offset]);
  const loadmore = useCallback(() => {
    dispatch(LoadMoreTable(offset + 10));
  }, [dispatch, offset]);
  const handleInfo = useCallback(
    async (item) => {
      dispatch(
        consultation_dtls(users_reducers?.prem_id, item?.consult_req_pk),
      );
    },
    [dispatch, users_reducers?.prem_id],
  );
  return (
    <View style={{flex: 1,marginTop:20}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{flex: 1, marginBottom: 100}}
        data={consultation_tables.data}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={offset}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd >= 0) {
            loadmore();
          }
        }}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handleInfo(item)}>
            <Card containerStyle={styles.plate}>
              <View
                style={{
                  width: 10,
                  height: 80,
                  backgroundColor: item?.sts_bg_color,
                }}>
                <View style={{width: 500, height: 80}}>
                  <Text style={styles.flatlistitemappointmentno}>
                    #{item.consult_req_pk}
                  </Text>
                  <Text style={styles.flatlistitem}>
                    Name: {item?.fullname}
                  </Text>
                  <Text style={styles.flatlistitem}>
                    Status:
                    <Text
                      style={{
                        color: item?.sts_bg_color,
                        borderRadius: 5,
                      }}>
                      {item.sts_desc}
                    </Text>
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Consult_table;
