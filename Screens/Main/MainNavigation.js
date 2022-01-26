import React, { useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Drawers from "./Drawers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { action_GET_userdetails } from "../../Services/Actions/Users_Actions";
function MainNavigation(props) {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const token = useSelector((state) => state.Default_Reducers.gettoken);
  useEffect(() => {
    let mounted = true;
    const getasyncs = async () => {
      if (mounted) {
        if (token === undefined) {
          try {
            await AsyncStorage.getItem("tokenizer").then((item) => {
              if (item === null) {
                Actions.home();
              } else {
                dispatch(action_set_token(item));
              }
            });

            dispatch(ACTION_GET_DEVICE(getDeviceId() + "-" + getUniqueId()));
          } catch (e) {
            alert("Failed to save the data to the storage");
          }
        }
        if (users_reducers.length <= 0) {
          dispatch(action_GET_userdetails());
        }
      }
    };
    mounted && getasyncs();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers, token]);

  return <Drawers />;
}

export default MainNavigation;
