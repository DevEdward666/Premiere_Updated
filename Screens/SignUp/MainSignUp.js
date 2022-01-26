import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import FirstInfo from './FirstInfo';
import LastInfo from './LastInfo';
import SecondInfo from './SecondInfo';
import ThirdInfo from './ThirdInfo';
import styles from './style';
export default function MainSignUp() {
  const firstinfo = useSelector(
    (state) => state.SignUp_Reducers.firstinfo.completed,
  );
  const secondinfo = useSelector(
    (state) => state.SignUp_Reducers.secondinfo.completed,
  );
  const thirdinfo = useSelector(
    (state) => state.SignUp_Reducers.thirdinfo.completed,
  );
  const lastinfo = useSelector(
    (state) => state.SignUp_Reducers.lastinfo.completed,
  );
  return (
    <View style={styles.container}>
      {firstinfo ? <SecondInfo /> : <FirstInfo />}
      {secondinfo ? <ThirdInfo /> : null}
      {thirdinfo ? <LastInfo /> : null}
    </View>
  );
}
