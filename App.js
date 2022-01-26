/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState} from 'react';
 import store from './Services/Store';
 import Routes from './Hooks/Routes';
 import {Provider} from 'react-redux';
 import GlobalFont from 'react-native-global-font';
 import {decode, encode} from 'base-64';
 
 const App = () => {
   useEffect(() => {
     let mounted = true;
     const globalfont = () => {
       let fontName = 'SFUIDisplay-Medium';
       GlobalFont.applyGlobal(fontName);
 
       if (!global.btoa) {
         global.btoa = encode;
       }
       if (!global.atob) {
         global.atob = decode;
       }
     };
     mounted && globalfont();
     return () => {
       mounted = false;
     };
   }, []);
   return (
     <Provider store={store}>
       <Routes />
     </Provider>
   );
 };
 
 export default App;
 