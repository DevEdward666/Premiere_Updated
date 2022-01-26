import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { Linking, View } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  createsource,
  createpayment,
  retrieve_source,
  create_payment,
  updateToChargeable,
  createCardPaymentIntent,
  create_card_payment_method,
  attach_payment_intent,
  retrieve_intent_paymaya,
  updatetopaid_Card,
} from "../../../Services/Actions/PaymentsActions";
// import { action_selected_log } from "../../../Services/Actions/MenuActions";
const PayMayaFooter = () => {
  const dispatch = useDispatch();
  const [billingaddress, setbillinaddress] = useState([]);
  const [billingredirect, setbillingredirect] = useState([]);
  const [constult_pk, setconstult_pk] = useState("");
  const [billingtype, setbillingtype] = useState([]);
  const [billingdata, setbillingdata] = useState([]);
  const [billingcurrency, setbillingcurrency] = useState("");
  const [billingamount, setbillingamount] = useState(0);
  const [billingdescription, setbillingdescription] = useState("");
  const [PayDisabled, setPayDisabled] = useState(false);
  const [paymentmethodallowed, setpaymentmethodallowed] = useState([]);
  const [paymentmethodoptions, setpaymentmethodoptions] = useState([]);
  const [CancelDisabled, setCancelDisabled] = useState(false);
  const [PayEffect, setPayEffect] = useState(false);
  const [DonePayEffect, setDonePayEffect] = useState(0);
  const [billingstatement_descriptor, setbillingstatement_descriptor] =
    useState("");
  const consult_info = useSelector(
    (state) => state.Clinic_Reducers.consult_info
  );
  const users_reducers = useSelector(
    (state) => state.Default_Reducers.userinfo
  );
  const refresh_payment = useSelector(
    (state) => state.Default_Reducers.refresh_payment
  );
  const sourcedata = useSelector((state) => state.PaymentReducers.sourcedata);
  const payment_intent_callback = useSelector(
    (state) => state.PaymentReducers.payment_intent_callback
  );
  const payment_method_callback = useSelector(
    (state) => state.PaymentReducers.payment_method_callback
  );
  const attach_intent_callback = useSelector(
    (state) => state.PaymentReducers.attach_intent_callback
  );
  const retrievesource = useSelector(
    (state) => state.PaymentReducers.retrievesource
  );
  useEffect(() => {
    let mounted = true;
    const paysource = () => {
      if (mounted) {
        if (PayEffect) {
          dispatch(
            createCardPaymentIntent(
              consult_info?.data[0]?.appointment_id,
              billingtype,
              billingcurrency,
              billingamount,
              paymentmethodallowed,
              paymentmethodoptions,
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
    paymentmethodallowed,
    paymentmethodoptions,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
  ]);
  useEffect(() => {
    let mounted = true;
    const paymentmethod = () => {
      if (mounted) {
        if (payment_intent_callback !== undefined) {
          dispatch(create_card_payment_method("paymaya"));
        }
      }
    };
    mounted && paymentmethod();
    return () => {
      mounted = false;
    };
  }, [dispatch, payment_intent_callback]);
  useEffect(() => {
    let mounted = true;
    const paymentattch = () => {
      if (mounted) {
        if (payment_method_callback !== undefined) {
          dispatch(
            attach_payment_intent(
              payment_intent_callback?.id,
              payment_method_callback?.id,
              payment_intent_callback?.attributes?.client_key,
              "https://opd.perpetualsuccourcebu.com/payment-feedback/success"
            )
          );
        }
      }
    };
    mounted && paymentattch();
    return () => {
      mounted = false;
    };
  }, [dispatch, payment_method_callback]);
  console.log(payment_intent_callback?.id);
  const handlePay = useCallback(async () => {
    await setconstult_pk(consult_info?.data[0]?.appointment_id);
    await setbillingtype("paymaya");
    await setbillingamount(50000);
    await setbillingcurrency("PHP");
    await setbillingdescription("Consultation Payment");
    await setbillingstatement_descriptor(
      "Consultation Payment from OPD Telemedicine"
    );
    await setpaymentmethodallowed(["card", "paymaya"]);
    await setpaymentmethodoptions({ card: { request_three_d_secure: "any" } });

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
      success: "https://opd.perpetualsuccourcebu.com/payment-feedback/success",
      failed: "https://opd.perpetualsuccourcebu.com/payment-feedback/failed",
      checkout_url:
        "https://opd.perpetualsuccourcebu.com/payment-feedback/success",
    });
    setPayEffect(true);
  }, [
    dispatch,
    consult_info,
    billingtype,
    billingcurrency,
    billingaddress,
    billingredirect,
  ]);
  // const handleFinishPayment = useCallback(async () => {
  //   await setconstult_pk(selected_log[0]?.orderno);
  //   await setbillingtype("grab_pay");
  //   await setbillingcurrency("PHP");
  //   await setbillingdescription("Consultation Payment");
  //   await setbillingstatement_descriptor("Consultation Payment from OPD Telemedicine");
  //   await setbillinaddress({
  //     address: {
  //       line1: consult_info?.data[0]?.line1,
  //       state: consult_info?.data[0]?.regiondesc,
  //       postal_code: consult_info?.data[0]?.zipcode,
  //       city: consult_info?.data[0]?.citymundesc,
  //       country: "PH",
  //       line2: consult_info?.data[0]?.line2,
  //     },
  //     name: `${consult_info?.data[0]?.first_name} ${consult_info?.data[0]?.middle_name} ${consult_info?.data[0]?.last_name} `,
  //     phone: consult_info?.data[0]?.mob_no,
  //     email: consult_info?.data[0]?.email,
  //   });
  //   await setbillingredirect({
  //     success:
  //       "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
  //     failed:
  //       "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed",
  //     checkout_url:
  //       "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
  //   });

  //   await setbillingdata({
  //     id: sourcedata?.source,
  //     attributes: {
  //       amount: selected_log[0]?.totalcost,
  //       description: "EatWell Payment",
  //       currency: billingcurrency,
  //       statement_descriptor: "EatWell Payment",
  //       type: "source.chargeable",
  //       data: {
  //         attributes: {
  //           source: {
  //             id: sourcedata?.source,
  //             type: "grab_pay",
  //           },
  //           amount: billingamount,
  //           bliing: {
  //             address: {
  //               line1: appointment_message?.data[0]?.line1,
  //               state: appointment_message?.data[0]?.regiondesc,
  //               postal_code: appointment_message?.data[0]?.zipcode,
  //               city: appointment_message?.data[0]?.citymundesc,
  //               country: "PH",
  //               line2: appointment_message?.data[0]?.line2,
  //             },
  //             name: `${users_reducers[0]?.first_name} ${users_reducers[0]?.middle_name} ${users_reducers[0]?.last_name} `,
  //             phone: users_reducers[0]?.mobile_no,
  //             email: users_reducers[0]?.email,
  //           },
  //           type: "grab_pay",
  //           currency: billingcurrency,
  //           livemode: false,
  //           status: "chargeable",
  //           description: billingdescription,
  //         },
  //         type: "source",
  //       },
  //     },
  //   });

  //   setTimeout(() => {
  //     dispatch(updateToChargeable(billingdata));
  //   }, 500);
  // }, [
  //   retrievesource?.source,
  //   retrievesource?.status,
  //   sourcedata?.source,
  //   users_reducers,
  // ]);

  const handleDonePayment = useCallback(async () => {
    dispatch(
      updatetopaid_Card(
        consult_info?.data[0]?.paymongo_src_id,
        consult_info?.data[0]?.appointment_id
      )
    );
  }, [dispatch, consult_info]);
  const handleCancel = () => {};

  useEffect(() => {
    let mounted = true;
    const pay = () => {
      if (mounted) {
        // dispatch(action_selected_log(selected_log[0]?.orderno));
        dispatch(
          retrieve_intent_paymaya(consult_info?.data[0]?.paymongo_src_id)
        );
      }
    };
    mounted && pay();
    return () => {
      mounted = false;
    };
  }, [dispatch, refresh_payment, consult_info]);

  // useEffect(() => {
  //   let mounted = true;
  //   const pay = () => {
  //     if (mounted) {
  //       if (
  //         retrievesource?.status === undefined ||
  //         retrievesource?.status !== "chargeable" ||
  //         retrievesource?.status !== "paid"
  //       ) {
  //         dispatch(
  //           createsource(
  //             constult_pk,
  //             billingtype,
  //             billingcurrency,
  //             billingamount,
  //             billingdescription,
  //             billingstatement_descriptor,
  //             billingaddress,
  //             billingredirect
  //           )
  //         );
  //       }
  //     }
  //   };
  //   mounted && pay();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [dispatch, PayEffect, retrievesource?.source, retrievesource?.status]);

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
      {retrievesource?.source?.attributes?.status === "succeeded" ? (
        consult_info?.data[0].payment_status === "PAID" ? null : (
          <View style={{ flex: 2 }}>
            <Button
              onPress={() => handleDonePayment()}
              buttonStyle={styles.btnpay}
              title="Finish Payment"
            />
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
              title="Pay Via PayMaya"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PayMayaFooter;
