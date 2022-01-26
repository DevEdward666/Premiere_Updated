import React, { useCallback, useEffect, useState } from "react";
import { Button, Text } from "react-native-elements";
import { Linking, View } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  createsource,
  createpayment,
  retrieve_source,
  create_payment,
  updateToChargeable,
} from "../../../Services/Actions/PaymentsActions";
// import { action_selected_log } from "../../../Services/Actions/MenuActions";
const GcashFooter = () => {
  const dispatch = useDispatch();
  const [billingaddress, setbillinaddress] = useState([]);
  const [billingredirect, setbillingredirect] = useState([]);
  const [constult_pk, setconstult_pk] = useState("");
  const [billingtype, setbillingtype] = useState([]);
  const [billingdata, setbillingdata] = useState([]);
  const [billingcurrency, setbillingcurrency] = useState("");
  const [billingamount, setbillingamount] = useState(0);
  const [billingdescription, setbillingdescription] = useState("");
  const [sourcecreated, setsourcecreated] = useState(false);
  const [PayDisabled, setPayDisabled] = useState(false);
  const [CancelDisabled, setCancelDisabled] = useState(false);
  const [PayEffect, setPayEffect] = useState(false);
  const [DonePayEffect, setDonePayEffect] = useState(0);
  const [billingstatement_descriptor, setbillingstatement_descriptor] =
    useState("");
  const consult_info = useSelector(
    (state) => state.Clinic_Reducers.consult_info
  );
  // const selected_log = useSelector((state) => state.MenuReducers.selected_log);
  const users_reducers = useSelector(
    (state) => state.Default_Reducers.userinfo
  );
  const refresh_payment = useSelector(
    (state) => state.Default_Reducers.refresh_payment
  );
  const sourcedata = useSelector((state) => state.PaymentReducers.sourcedata);
  const retrievesource = useSelector(
    (state) => state.PaymentReducers.retrievesource
  );

  useEffect(() => {
    let mounted = true;
    const paysource = () => {
      if (mounted) {
        if (PayEffect) {
          dispatch(
            createsource(
              consult_info?.data[0]?.appointment_id,
              billingtype,
              billingcurrency,
              billingamount,
              billingdescription,
              billingstatement_descriptor,
              billingaddress,
              billingredirect
            )
          );
          setPayEffect(false);
        }
      }
    };
    mounted && paysource();
    return () => {
      mounted = false;
    };
  }, [
    PayEffect,
    consult_info?.data[0]?.appointment_id,
    billingtype,
    billingcurrency,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
  ]);

  const handlePay = useCallback(async () => {
    await setconstult_pk(consult_info?.data[0]?.appointment_id);
    await setbillingtype("gcash");
    await setbillingcurrency("PHP");
    await setbillingamount(500);
    await setbillingdescription("Consultation Payment");
    await setbillingstatement_descriptor(
      "Consultation Payment from OPD Telemedicine"
    );
    await setbillinaddress({
      address: {
        line1: consult_info?.data[0]?.line1,
        state: consult_info?.data[0]?.regiondesc,
        postal_code: consult_info?.data[0]?.zipcode,
        city: consult_info?.data[0]?.citymundesc,
        country: "PH",
        line2: consult_info?.data[0]?.line2,
      },
      name: `${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `,
      phone: consult_info?.data[0]?.mob_no,
      email: consult_info?.data[0]?.email,
    });
    await setbillingredirect({
      success:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
      failed:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed",
      checkout_url:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
    });
    setPayEffect(true);
    // }else{
    //   alert("You can only use online payment if your total bill is Php 100 and above")
    // }
  }, [dispatch, consult_info]);
  const handleFinishPayment = useCallback(async () => {
    if (retrievesource?.status === "pending") {
      Linking.openURL(retrievesource?.source?.redirect?.checkout_url);
    } else {
      await setconstult_pk(consult_info?.data[0]?.appointment_id);
      await setbillingtype("gcash");
      await setbillingcurrency("PHP");
      await setbillingamount(500);
      await setbillingdescription("Consultation Payment");
      await setbillingstatement_descriptor(
        "Consultation Payment from OPD Telemedicine"
      );
      await setbillinaddress({
        address: {
          line1: consult_info?.data[0]?.line1,
          state: consult_info?.data[0]?.regiondesc,
          postal_code: consult_info?.data[0]?.zipcode,
          city: consult_info?.data[0]?.citymundesc,
          country: "PH",
          line2: consult_info?.data[0]?.line2,
        },
        name: `${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `,
        phone: consult_info?.data[0]?.mob_no,
        email: consult_info?.data[0]?.email,
      });
      await setbillingredirect({
        success:
          "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
        failed:
          "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed",
        checkout_url:
          "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
      });

      await setbillingdata();

      dispatch(
        updateToChargeable({
          id: sourcedata?.source,
          attributes: {
            amount: 500,
            description: "Consultation Payment",
            currency: "PHP",
            statement_descriptor: "Consultation Payment from OPD Telemedicine",
            type: "source.chargeable",
            data: {
              attributes: {
                source: {
                  id: sourcedata?.source,
                  type: "gcash",
                },
                amount: 500,
                bliing: {
                  address: {
                    line1: consult_info?.data[0]?.line1,
                    state: consult_info?.data[0]?.regiondesc,
                    postal_code: consult_info?.data[0]?.zipcode,
                    city: consult_info?.data[0]?.citymundesc,
                    country: "PH",
                    line2: consult_info?.data[0]?.line2,
                  },
                  name: `${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `,
                  phone: consult_info?.data[0]?.mob_no,
                  email: consult_info?.data[0]?.email,
                },
                type: "gcash",
                currency: "PHP",
                livemode: false,
                status: "chargeable",
                description: "Consultation Payment",
              },
              type: "source",
            },
          },
        })
      );
    }
  }, [
    retrievesource?.source,
    retrievesource?.status,
    sourcedata?.source,
    billingdata,
    consult_info,
  ]);
  const handleDonePayment = useCallback(async () => {
    await setconstult_pk(consult_info?.data[0]?.appointment_id);
    await setbillingtype("gcash");
    await setbillingcurrency("PHP");
    await setbillingamount(50000);
    await setbillingdescription("Consultation Payment");
    await setbillingstatement_descriptor(
      "Consultation Payment from OPD Telemedicine"
    );
    await setbillinaddress({
      address: {
        line1: consult_info?.data[0]?.line1,
        state: consult_info?.data[0]?.regiondesc,
        postal_code: consult_info?.data[0]?.zipcode,
        city: consult_info?.data[0]?.citymundesc,
        country: "PH",
        line2: consult_info?.data[0]?.line2,
      },
      name: `${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `,
      phone: consult_info?.data[0]?.mob_no,
      email: consult_info?.data[0]?.email,
    });
    await setbillingredirect({
      success:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
      failed:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed",
      checkout_url:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
    });

    await setbillingdata({
      id: sourcedata?.source,
      attributes: {
        amount: 500,
        description: "Consultation Payment",
        currency: "PHP",
        statement_descriptor: "Consultation Payment from OPD Telemedicine",
        type: "payment.paid",
        data: {
          attributes: {
            source: {
              id: sourcedata?.source,
              type: "payment",
            },
            amount: 500,
            bliing: {
              address: {
                line1: consult_info?.data[0]?.line1,
                state: consult_info?.data[0]?.regiondesc,
                postal_code: consult_info?.data[0]?.zipcode,
                city: consult_info?.data[0]?.citymundesc,
                country: "PH",
                line2: consult_info?.data[0]?.line2,
              },
              name: `${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `,
              phone: consult_info?.data[0]?.mob_no,
              email: consult_info?.data[0]?.email,
            },
            type: "gcash",
            currency: "PHP",
            livemode: false,
            status: "paid",
            description: "Consultation Payment",
          },
          type: "source",
        },
      },
    });
    setTimeout(() => {
      dispatch(createpayment(billingdata));
    }, 500);
  }, [
    dispatch,
    sourcedata?.source,
    consult_info?.data[0]?.orderno,
    consult_info?.data[0]?.mob_no,
    consult_info?.data[0]?.email,
    consult_info?.data[0]?.first_name,
    consult_info?.data[0]?.middle_name,
    consult_info?.data[0]?.last_name,
    billingtype,
    billingcurrency,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
    billingdata,
    sourcedata?.source,
    consult_info?.data[0]?.paymongo_src_id,
  ]);
  const handleCancel = () => {};

  useEffect(() => {
    let mounted = true;
    const pay = () => {
      if (mounted) {
        dispatch(retrieve_source(sourcedata?.source));
        // dispatch(action_selected_log(selected_log[0]?.orderno));
      }
    };
    mounted && pay();
    return () => {
      mounted = false;
    };
  }, [dispatch, refresh_payment, sourcedata?.source]);
  useEffect(() => {
    let mounted = true;
    const donepay = () => {
      if (mounted) {
        if (retrievesource?.status === "for approval") {
          setPayDisabled(true);
          alert(
            "Your request is being processed please wait for admins approval"
          );
        } else if (retrievesource?.status === "paid") {
          setPayDisabled(true);
          setCancelDisabled(true);
        } else if (retrievesource?.status === "approved") {
          setPayDisabled(false);
        }
      }
    };
    mounted && donepay();
    return () => {
      mounted = false;
    };
  }, [retrievesource?.status]);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          flexDirection: "row",
        },
      ]}
    >
      {retrievesource?.status === "chargeable" ? (
        <View style={{ flex: 2 }}>
          <Button
            onPress={() => handleFinishPayment()}
            buttonStyle={styles.btnpay}
            title="Done Payment"
          />
        </View>
      ) : retrievesource?.status === "paid" ? (
        consult_info?.data[0].payment_status !== "PAID" ? (
          <View style={{ flex: 2 }}>
            <Button
              onPress={() => handleDonePayment()}
              buttonStyle={styles.btnpay}
              title="Finish Payment"
            />
          </View>
        ) : (
          <View style={{ flex: 2, textAlign: "center" }}>
            <Text h3 h3Style={{ color: "red" }} style={{ textAlign: "center" }}>
              PAID
            </Text>
          </View>
        )
      ) : CancelDisabled ? null : (
        <>
          <View style={{ flex: 2 }}>
            <Button
              disabled={CancelDisabled}
              onPress={() => handleCancel()}
              buttonStyle={styles.btncancel}
              title="Cancel"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Button
              disabled={PayDisabled}
              onPress={() => handlePay()}
              buttonStyle={styles.btnpay}
              title="Pay Via Gcash"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default GcashFooter;
