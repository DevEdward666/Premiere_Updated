import {
  PAYMENT_DONE,
  CREATE_SOURCE,
  RETRIEVE_SOURCE,
  PAID_SOURCE,
  PUBLIC_KEY_URL,
  SECRET_KEY_URL,
  PAYMENT_METHOD_CALLBACK,
  ATTACH_INTENT_CALLBACK,
  PAYMENT_INTENT_CALLBACK,
  CARD_BODY,
  CARD_HEADER,
} from "../Types/PaymentTypes";
import { BASE_URL } from "../Types/Default_Types";
import { Linking } from "react-native";
import { encode } from "base-64";
export const createCardPaymentIntent =
  (
    transaction_pk,
    type,
    currency,
    amount,
    paymentmethodallowed,
    paymentmethodoptions,
    description,
    statement_descriptor,
    billingaddress,
    billingredirect
  ) =>
  async (dispatch) => {
    var url = `${BASE_URL}/api/paymongo/CreatePaymentIntent`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_pk: transaction_pk,
        type: type,
        currency: currency,
        amount: amount,
        payment_method_allowed: paymentmethodallowed,
        payment_method_options: paymentmethodoptions,
        description: description,
        statement_descriptor: statement_descriptor,
        billing: billingaddress,
        redirect: billingredirect,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: PAYMENT_INTENT_CALLBACK,
          payload: res?.data,
        });
      });
  };
export const createsource =
  (
    transaction_pk,
    type,
    currency,
    amount,
    description,
    statement_descriptor,
    billingaddress,
    billingredirect
  ) =>
  async (dispatch) => {
    var url = `${BASE_URL}/api/paymongo/EWalletCreateSource`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_pk: transaction_pk,
        type: type,
        currency: currency,
        amount: amount,
        description: description,
        statement_descriptor: statement_descriptor,
        billing: billingaddress,
        redirect: billingredirect,
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        dispatch({
          type: CREATE_SOURCE,
          payload: {
            source: res?.data?.split("=")[1],
            status: res?.other_info,
          },
        });
        await Linking.openURL(res?.data.toString());
      });
  };
export const updateToChargeable = (data) => async (dispatch) => {
  var updateToChargeableUrl = `${BASE_URL}/api/paymongo/EWalletWebHook`;
  await fetch(updateToChargeableUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.succes) {
        dispatch({
          type: RETRIEVE_SOURCE,
          payload: { source: res.data, status: res.other_info },
        });
      }
    });
};
export const updatetopaid_Card =
  (intent_id, transaction_pk) => async (dispatch) => {
    var updatetopaid = `${BASE_URL}/api/paymongo/PaidPaymentIntent`;
    await fetch(updatetopaid, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: intent_id,
        transaction_pk: transaction_pk,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.succes) {
          dispatch({
            type: RETRIEVE_SOURCE,
            payload: { source: res.data, status: res.other_info },
          });
        }
      });
  };
export const reset = () => (dispatch) => {
  dispatch({
    type: CREATE_SOURCE,
    payload: { source: "", status: "" },
  });
};
export const createpayment = (paymentdata) => async (dispatch) => {
  var url = `${BASE_URL}/api/paymongo/EWalletPaidWebHook`;
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: paymentdata,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: PAYMENT_DONE,
        payload: res.data,
      });
      dispatch({
        type: CREATE_SOURCE,
        payload: { source: "", status: "" },
      });
    });
};

export const create_card_payment_method =
  (type, carddata, billing) => async (dispatch) => {
    var url = `https://api.paymongo.com/v1/payment_methods`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + encode(SECRET_KEY_URL + ":" + ""),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            type: type,
            details: carddata,
            billing: billing,
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: PAYMENT_METHOD_CALLBACK,
          payload: res?.data,
        });
      });
  };

export const attach_payment_intent =
  (payment_id, payment_method_id, client_key_id, returnurl) =>
  async (dispatch) => {
    var url = `https://api.paymongo.com/v1/payment_intents/${payment_id}/attach`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + encode(SECRET_KEY_URL + ":" + ""),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            payment_method: payment_method_id,
            client_key: client_key_id,
            return_url: returnurl,
          },
        },
      }),
    })
      .then((response) => response.json())
      .then(async (res) => {
        dispatch({
          type: ATTACH_INTENT_CALLBACK,
          payload: res?.data,
        });
        if (res?.data.attributes?.next_action?.redirect?.url !== undefined) {
          await Linking.openURL(
            res?.data.attributes?.next_action?.redirect?.url
          );
        } else {
          console.log("not 3d secure");
        }
      });
  };

export const retrieve_source = (paymongo_src_id) => async (dispatch) => {
  var url = `https://api.paymongo.com/v1/sources/${paymongo_src_id}`;
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(PUBLIC_KEY_URL + ":" + ""),
      Accept: "*/*",
      // 'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: RETRIEVE_SOURCE,
        payload: {
          source: res?.data?.attributes,
          status: res?.data?.attributes?.status,
        },
      });
    });
};

export const retrieve_intent_paymaya =
  (paymongo_src_id) => async (dispatch) => {
    var url = `https://api.paymongo.com/v1/payment_intents/${paymongo_src_id}`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + encode(SECRET_KEY_URL + ":" + ""),
        Accept: "*/*",
        // 'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: RETRIEVE_SOURCE,
          payload: {
            source: res?.data,
            status: res?.data?.attributes?.status,
          },
        });
      });
  };

export const create_payment = (paymentdata) => async (dispatch) => {
  var payment_url = `https://api.paymongo.com/v1/payments`;
  await fetch(payment_url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(SECRET_KEY_URL + ":" + ""),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount: paymentdata?.attributes?.amount,
          source: { type: "source", id: paymentdata?.id },
          currency: "PHP",
        },
      },
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: PAID_SOURCE,
        payload: {
          source: res?.data,
          status: true,
        },
      });
    });
};

export const set_card_body =
  (name, mobile, email, line1, line2, state, postal, city, country) =>
  async (dispatch) => {
    dispatch({
      type: CARD_BODY,
      payload: {
        name: name,
        mobile: mobile,
        email: email,
        line1: line1,
        line2: line2,
        state: state,
        postal: postal,
        city: city,
        country: country,
      },
    });
  };

export const set_card_header =
  (card_number, exp_month, exp_year, cvc) => async (dispatch) => {
    dispatch({
      type: CARD_HEADER,
      payload: {
        card_number: card_number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
  };
