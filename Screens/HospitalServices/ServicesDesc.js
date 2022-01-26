import React, {useCallback} from 'react';
import ServicesCard from './ServicesCard';
import {TouchableHighlight, FlatList, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';
import {action_set_service_info_id} from '../../Services/Actions/Services_Actions';
import {Actions} from 'react-native-router-flux';
const ServicesDesc = () => {
  const servicedesc = useSelector(
    (state) => state.Services_Reducers.servicedesc,
  );
  const services_reducers_url = useSelector((state) => state.News_Reducers.url);
  const dispatch = useDispatch();
  const handleServiceInfo = useCallback(
    (id) => {
      dispatch(action_set_service_info_id(id));
      Actions.service_info();
    },
    [dispatch],
  );
  return (
    <FlatList
      style={styles.container}
      data={servicedesc}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.1}
      // onScroll={() => HideHeader()}
      renderItem={({item, index}) => (
        <TouchableHighlight
          underlayColor="white"
          onPress={() => handleServiceInfo(item?.serv_desc_id)}>
          <ServicesCard
            title={item.title}
            img={`${services_reducers_url}/${item.images}`}
            description={item.desc}
          />
        </TouchableHighlight>
      )}
    />
  );
};
export default ServicesDesc;
