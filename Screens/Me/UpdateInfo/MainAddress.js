import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  action_GET_civilstatus,
  action_GET_nationality,
  action_GET_region,
  action_GET_religion,
} from '../../../Services/Actions/Default_Actions';
import UpdateAddressUI from './UpdateAddressUI';
export default function MainAddress() {
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getnationalityandregion = () => {
      if (mounted) {
        dispatch(action_GET_region());
        dispatch(action_GET_nationality());
        dispatch(action_GET_civilstatus());
        dispatch(action_GET_religion());
      }
    };
    mounted && getnationalityandregion();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return <UpdateAddressUI />;
}
