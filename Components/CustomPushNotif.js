// import * as Notifications from 'expo-notifications';
// import React, {useState, useEffect, useRef} from 'react';
// import {Text, View, Button, Platform} from 'react-native';
// import Constants from 'expo-constants';
// import {useSelector} from 'react-redux';
// const CustomPushNotif = ({
//   notfititle = '',
//   notifbody = '',
//   to = '',
//   type = '',
// }) => {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();
//   const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token),
//     );

//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         setNotification(notification);
//       },
//     );

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log(response);
//       },
//     );

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);
//   useEffect(() => {
//     let mounted = true;
//     const triggernotif = async () => {
//       if (notfititle !== '' || notifbody !== '' || to !== '') {
//         if (type === 'Comment') {
//           Notifications.setNotificationHandler({
//             handleNotification: async () => ({
//               shouldShowAlert: true,
//               shouldPlaySound: true,
//               shouldSetBadge: true,
//             }),
//           });
//           await schedulePushNotification(notfititle, notifbody);
//         } else {
//           if (to === users_reducers?.prem_id || to === 'all') {
//             Notifications.setNotificationHandler({
//               handleNotification: async () => ({
//                 shouldShowAlert: true,
//                 shouldPlaySound: true,
//                 shouldSetBadge: true,
//               }),
//             });
//             await schedulePushNotification(notfititle, notifbody);
//           }
//         }
//       }
//     };
//     mounted && triggernotif();
//     return () => (mounted = false);
//   }, [notfititle, notifbody, to]);
//   return <></>;
// };

// const schedulePushNotification = async (notfititle, notifbody) => {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: notfititle,
//       body: notifbody,
//       data: {data: 'goes here'},
//     },
//     trigger: {seconds: 1},
//   });
// };

// const registerForPushNotificationsAsync = async () => {
//   let token;
//   if (Constants.isDevice) {
//     const {status: existingStatus} = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const {status} = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// };

// export default CustomPushNotif;
