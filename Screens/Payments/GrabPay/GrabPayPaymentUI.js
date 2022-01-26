import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import GcashBody from "./GrabPayBody";
import GcashFooter from "./GrabPayFooter";
import GcashHeader from "./GrabPayHeader";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import { ScrollView, RefreshControl } from "react-native";
import { action_refresh } from "../../../Services/Actions/Default_Actions";
import GrabPayBody from "./GrabPayBody";
import GrabPayFooter from "./GrabPayFooter";
import GrabPayHeader from "./GrabPayHeader";
const GrabPayPaymentUI = () => {
  const consult_info = useSelector(
    (state) => state.Clinic_Reducers.consult_info
  );
  const refresh_payment = useSelector(
    (state) => state.Default_Reducers.refresh_payment
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    dispatch(action_refresh(true));
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const refresh_payments = () => {
      if (mounted) {
        if (refresh_payment) {
          dispatch(action_refresh(false));
        }
      }
    };
    mounted && refresh_payments();
  }, [dispatch, refresh_payment]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh_payment} onRefresh={onRefresh} />
      }
    >
      <GrabPayHeader
        request_code={consult_info?.data[0]?.appointment_id}
        requested_on={consult_info?.data[0]?.request_at}
        requestor_name={`${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `}
        consultation_cost={500}
      />
      <GrabPayFooter />
      <GrabPayBody
        name={`${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `}
        line1={consult_info?.data[0]?.line1}
        line2={consult_info?.data[0]?.line2}
        mobile={consult_info?.data[0]?.mob_no}
        email={consult_info?.data[0]?.email}
        state={consult_info?.data[0]?.provincedesc}
        postal={consult_info?.data[0]?.zip_code}
        city={consult_info?.data[0]?.citymundesc}
        country={"PH"}
      />
    </ScrollView>
  );
};
export default GrabPayPaymentUI;
