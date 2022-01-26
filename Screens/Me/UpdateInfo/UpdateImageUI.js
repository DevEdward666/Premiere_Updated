import React, {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Text, TouchableHighlight, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import DoneOverlay from '../../../Components/CustomOverlay/DoneOverlay';
import {action_alerted} from '../../../Services/Actions/Default_Actions';
import {action_passbase_prompt_reset} from '../../../Services/Actions/PassbaseActions';
import PassbaseUI from '../Passbase/PassbaseUI';
import styles from './style';
const UpdateImageUI = () => {
  const [profileimageresponse, setprofileimageresponse] = useState(null);
  const [resourcePath, setresourcePath] = useState(null);
  const [resourcePathProfile, setresourcePathProfile] = useState(null);
  const [imageresponse, setimageresponse] = useState(null);
  const [next, setnext] = useState(0);
  const [prmoptmessage, setprmoptmessage] = useState('');
  const setcamera = useSelector((state) => state.Default_Reducers.setcamera);
  const alerted = useSelector((state) => state.Default_Reducers.alerted);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const donepassbase = useSelector(
    (state) => state.SignUp_Reducers.donepassbase,
  );
  const [overlayvisible, setoverlayvisible] = useState(false);
  const dispatch = useDispatch();
  const profileImage = useCallback(() => {
    dispatch(action_alerted(true));
  }, [dispatch]);
  // useEffect(() => {
  //   let mounted = true;
  //   const getimagepicker = async () => {
  //     requestCameraPermission();
  //     if (setcamera === 'launchCamera') {
  //       ImagePicker.launchCamera(
  //         {maxWidth: 1280, maxHeight: 720},
  //         (response) => {
  //           setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
  //           if (response.didCancel) {
  //             console.log('Action cancelled ');
  //           } else if (response.error) {
  //             console.log('Error : ', error);
  //           } else {
  //             const source = {uri: response.uri};
  //             console.log(response.uri);
  //             setprofileimageresponse(response);
  //             setprmoptmessage('');

  //             setpromptopen(false);
  //             //  dispatch(action_POST_FileImageProfile(response, username));
  //           }
  //         },
  //       );
  //       dispatch(action_alerted(false));
  //     } else if (setcamera === 'launchImageLibrary') {
  //       // try {
  //       //   const res = await DocumentPicker.pickMultiple({
  //       //     type: [DocumentPicker.types.allFiles],
  //       //   });
  //       //   setprofileimageresponse(res);
  //       //   setresourcePathProfile(res.uri);
  //       // } catch (err) {
  //       //   if (DocumentPicker.isCancel(err)) {
  //       //     console.log('error -----', err);
  //       //   } else {
  //       //     throw err;
  //       //   }
  //       // }
  //       ImagePicker.launchImageLibrary(
  //         {maxWidth: 1280, maxHeight: 720, mediaType: 'photo'},
  //         (response) => {
  //           setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
  //           if (response.didCancel) {
  //             console.log('Action cancelled ');
  //           } else if (response.error) {
  //             console.log('Error : ', error);
  //           } else {
  //             const source = {uri: response.uri};
  //             console.log(response.uri);
  //             setprofileimageresponse(response);
  //             setprmoptmessage('');

  //             setpromptopen(false);
  //             //  dispatch(action_POST_FileImageProfile(response, username));
  //           }
  //         },
  //       );
  //       dispatch(action_alerted(false));
  //     }
  //   };
  //   mounted && getimagepicker();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [setcamera, dispatch]);
  // const tomarFoto = useCallback(() => {
  //   ImagePicker.launchCamera({maxWidth: 1280, maxHeight: 720}, (response) => {
  //     requestCameraPermission();
  //     setresourcePath(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
  //     if (response.didCancel) {
  //       console.log('Action cancelled ');
  //     } else if (response.error) {
  //       console.log('Error : ', error);
  //     } else {
  //       const source = {uri: response.uri};
  //       console.log(response.uri);
  //       setimageresponse(response);
  //       setprmoptmessage('');

  //       setpromptopen(false);
  //       //    dispatch(action_POST_FileImage(response));
  //     }
  //   });
  // }, [setresourcePath]);
  const requestCameraPermission = async () => {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        async (response) => {
          if (response === false) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMEARA,
              {
                title: 'Permission to use camera',
                message: 'Premiere needs access to your camera ',
                buttonNegative: 'Decline',
                buttonPositive: 'Approve',
              },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
            } else {
              console.log('Camera permission denied');
            }
          }
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };
  const NextStep = useCallback(() => {
    // if (resourcePathProfile === null) {
    //   setprmoptmessage('Please Take Profile Image');
    //   setpromptopen(true);
    // } else if (resourcePath === null) {
    //   setprmoptmessage(
    //     'Please Insert a photo of a valid document Ex: Drivers License',
    //   );
    //   setpromptopen(true);
    // } else {
    //   setpromptopen(false);

    //   dispatch(
    //     action_set_imageinfo(
    //       profileimageresponse,
    //       imageresponse,
    //       users_reducers?.username,
    //     ),
    //   );
    //   Actions.update_address();
    // }
    if (users_reducers?.regiondesc === null) {
      Actions.update_address();
    } else {
      setnext((prev) => prev + 1);
    }
  }, [
    resourcePathProfile,
    resourcePath,
    dispatch,
    profileimageresponse,
    imageresponse,
  ]);
  useEffect(() => {
    let mounted = true;
    const validated = () => {
      if (mounted) {
        if (donepassbase?.success) {
          setoverlayvisible(true);
          dispatch(action_passbase_prompt_reset());
        }
      }
    };
    mounted && validated();
    return () => {
      mounted = false;
    };
  }, [next, dispatch]);
  const handleDone = () => {
    Actions.index();
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.Inputcontainer}>
          <DoneOverlay
            visible={overlayvisible}
            message={`Account updated successfully!. Please be patience while our team validating your details sent to us. Thank You!`}
            UI={
              <Button
                onPress={() => handleDone()}
                buttonStyle={{
                  backgroundColor: '#0084FF',
                  borderRadius: 10,
                  width: '70%',
                  marginBottom: 80,
                  alignSelf: 'center',
                  height: 50,
                }}
                title="Done"
              />
            }
          />
          <PassbaseUI />
          <TouchableHighlight
            style={styles.login}
            underlayColor="rgba(62, 178, 250, 0.5)"
            onPress={() => NextStep()}>
            <Text style={styles.submitText}>Next</Text>
          </TouchableHighlight>
          {/* <CustomAlert
            showalert={alerted}
            messageTitle={'Choose your option'}
          />
          <Text style={styles.TextImageSubtitle}>
            Upload your profile image here
          </Text>
          <View style={styles.mainimagecontainer}>
            {resourcePathProfile ? (
              <TouchableHighlight
                onPress={() => profileImage()}
                style={{
                  width: '100%',
                  height: 180,
                  resizeMode: 'contain',
                  alignContent: 'flex-start',
                }}
                underlayColor="white">
                <ImageBackground
                  style={styles.avatar}
                  source={{
                    uri: resourcePathProfile,
                  }}>
                  <Text style={styles.text}>Choose Image</Text>
                </ImageBackground>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={() => profileImage()}
                style={{
                  width: '100%',
                  height: 180,
                  resizeMode: 'contain',
                  alignContent: 'flex-start',
                }}
                underlayColor="white">
                <ImageBackground
                  style={styles.avatar}
                  source={{
                    uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                  }}>
                  <Text style={styles.text}>Take a Photo</Text>
                </ImageBackground>
              </TouchableHighlight>
            )}
          </View>
          <Text style={styles.TextImageSubtitle}>
            Upload your Valid ID here
          </Text>
          <View style={styles.mainimagecontainer}>
            {resourcePath ? (
              <TouchableHighlight
                onPress={tomarFoto}
                style={{
                  width: '100%',
                  height: 220,
                  resizeMode: 'center',
                  alignContent: 'flex-start',
                }}
                underlayColor="rgba(255,255,355,0.1)">
                <ImageBackground
                  style={{
                    width: '100%',
                    height: 220,
                    resizeMode: 'center',
                    backgroundColor: 'rgba(255,255,355,0.1)',
                    alignContent: 'flex-start',
                  }}
                  source={{uri: resourcePath}}>
                  <Text style={styles.text}>Capture Valid ID</Text>
                </ImageBackground>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={tomarFoto}
                style={{
                  width: '100%',
                  height: 220,
                  resizeMode: 'contain',
                  alignContent: 'flex-start',
                }}
                underlayColor="rgba(255,255,355,0.1)">
                <ImageBackground
                  style={{
                    width: '100%',
                    height: 220,
                    backgroundColor: 'rgba(255,255,355,0.1)',
                    resizeMode: 'contain',
                    alignContent: 'flex-start',
                  }}
                  source={require('../assets/icons/valid_id.jpg')}>
                  <Text style={styles.text}>Capture Valid ID</Text>
                </ImageBackground>
              </TouchableHighlight>
            )}
          </View>
        
          <CustomSnackbar message={prmoptmessage} open={promptopen} /> */}
        </View>
      </View>
    </View>
  );
};
export default UpdateImageUI;
