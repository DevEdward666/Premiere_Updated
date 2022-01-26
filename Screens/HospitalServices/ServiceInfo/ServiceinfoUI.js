import React from 'react';
import {View, Image, Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../style';
import ServiceinfoCard from './ServiceInfoCard';
import {useSelector} from 'react-redux';
const ServiceinfoUI = () => {
  const servicesinfo = useSelector(
    (state) => state.Services_Reducers.servicesinfo,
  );
  const services_reducers_url = useSelector((state) => state.News_Reducers.url);
  console.log(servicesinfo);
  return (
    <FlatList
      style={styles.container}
      data={servicesinfo}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.1}
      // onScroll={() => HideHeader()}
      renderItem={({item, index}) => (
        <ServiceinfoCard
          img={`${services_reducers_url}/${item.serv_image}`}
          title={item.serv_title}
          description={item.serv_desc}
        />
      )}
    />
  );
};
export default ServiceinfoUI;
