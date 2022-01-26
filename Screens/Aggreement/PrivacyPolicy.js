import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {action_SignUp_user} from '../../Services/Actions/SignUp_Actions';
import Spinner from 'react-native-loading-spinner-overlay';
const TermsAndConditions = () => {
  const [accepted, setaccepted] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const firstinfo = useSelector((state) => state.SignUp_Reducers.firstinfo);
  const secondinfo = useSelector((state) => state.SignUp_Reducers.secondinfo);
  const thirdinfo = useSelector((state) => state.SignUp_Reducers.thirdinfo);
  const lastinfo = useSelector((state) => state.SignUp_Reducers.lastinfo);
  const donesignup = useSelector((state) => state.SignUp_Reducers.donesignup);
  const dispatch = useDispatch();
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const handleSubmit = useCallback(() => {
    if (firstinfo.firstname !== '') {
      setSpinner(true);
      dispatch(
        action_SignUp_user(
          firstinfo?.firstname,
          firstinfo?.middlename,
          firstinfo?.lastname,
          secondinfo?.gender,
          secondinfo?.birthdate,
          thirdinfo?.mobile.split(' ').join(''),
          thirdinfo?.email,
          lastinfo?.username,
          lastinfo?.password,
        ),
      );
    } else {
      Actions.home();
    }
  }, [dispatch, firstinfo, secondinfo, thirdinfo, lastinfo]);
  useEffect(() => {
    let mounted = true;
    const getsignupfeedback = () => {
      if (donesignup?.done) {
        setSpinner(false);
        Actions.otp();
      } else {
        setSpinner(false);
      }
    };
    mounted && getsignupfeedback();
    return () => {
      mounted = false;
    };
  }, [donesignup]);
  console.log(donesignup)
  return (
    <>
    {spinner?  <Spinner
      visible={true}
      textContent={`Loading... Please don't close the application`}
      textStyle={styles.spinnerTextStyle}
    />:null}
  
    <View style={styles.container}>
    
      <Text style={styles.title}>Privacy Policy</Text>
      <ScrollView
        style={styles.tcContainer}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setaccepted(true);
          }
        }}>
        <Text style={styles.tcL}>
          IT Solutions Consultancy and Services built the Premire app as a Free
          app. This SERVICE is provided by TUO IT Solutions Consultancy and
          Services at no cost and is intended for use as is. This page is used
          to inform visitors regarding our policies with the collection, use,
          and disclosure of Personal Information if anyone decided to use our
          Service. If you choose to use our Service, then you agree to the
          collection and use of information in relation to this policy. The
          Personal Information that we collect is used for providing and
          improving the Service. We will not use or share your information with
          anyone except as described in this Privacy Policy. The terms used in
          this Privacy Policy have the same meanings as in our Terms and
          Conditions, which is accessible at Premire unless otherwise defined in
          this Privacy Policy. **Information Collection and Use** For a better
          experience, while using our Service, we may require you to provide us
          with certain personally identifiable information, including but not
          limited to Name, Gender, Birthdate, Address ,Email, Mobile no,
          Picture, Valid ID. The information that we request will be retained by
          us and used as described in this privacy policy. The app does use
          third party services that may collect information used to identify
          you. Link to privacy policy of third party service providers used by
          the app [Google Play Services](https://policies.google.com/terms)
          [Facebook](https://www.facebook.com/legal/terms/plain_text_terms)
          [Expo](https://expo.io/terms)
        </Text>
        <Text style={styles.tcP}>Log Data </Text>
        <Text style={styles.tcL}>
          {'\u2022'} We want to inform you that whenever you use our Service, in
          a case of an error in the app we collect data and information (through
          third party products) on your phone called Log Data. This Log Data may
          include information such as your device Internet Protocol (“IP”)
          address, device name, operating system version, the configuration of
          the app when utilizing our Service, the time and date of your use of
          the Service, and other statistics.
        </Text>
        <Text style={styles.tcP}>Cookies </Text>
        <Text style={styles.tcL}>
          {'\u2022'}
          Cookies are files with a small amount of data that are commonly used
          as anonymous unique identifiers. These are sent to your browser from
          the websites that you visit and are stored on your device's internal
          memory. This Service does not use these “cookies” explicitly. However,
          the app may use third party code and libraries that use “cookies” to
          collect information and improve their services. You have the option to
          either accept or refuse these cookies and know when a cookie is being
          sent to your device. If you choose to refuse our cookies, you may not
          be able to use some portions of this Service.
        </Text>
        <Text style={styles.tcP}>Service Providers</Text>
        <Text style={styles.tcL}>
          {'\u2022'}
          We may employ third-party companies and individuals due to the
          following reasons: * To facilitate our Service; * To provide the
          Service on our behalf; * To perform Service-related services; or * To
          assist us in analyzing how our Service is used. We want to inform
          users of this Service that these third parties have access to your
          Personal Information. The reason is to perform the tasks assigned to
          them on our behalf. However, they are obligated not to disclose or use
          the information for any other purpose.
        </Text>
        <Text style={styles.tcP}>Security</Text>
        <Text style={styles.tcL}>
          {'\u2022'}
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </Text>
        <Text style={styles.tcP}>Children’s Privacy</Text>
        <Text style={styles.tcL}>
          {'\u2022'}
          These Services do not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from children
          under 13 years of age. In the case we discover that a child under 13
          has provided us with personal information, we immediately delete this
          from our servers. If you are a parent or guardian and you are aware
          that your child has provided us with personal information, please
          contact us so that we will be able to do necessary actions.
        </Text>
        <Text style={styles.tcP}>Changes to This Privacy Policy</Text>
        <Text style={styles.tcL}>
          {'\u2022'}
          We may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new Privacy Policy on this
          page. This policy is effective as of 2021-09-27
        </Text>
        <Text style={styles.tcP}>Contact Us</Text>
        <Text style={styles.tcL}>
          {'\u2022'}
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at tuoitsoulutions@gmail.com.
        </Text>
      </ScrollView>

      <TouchableOpacity
        disabled={!accepted}
        onPress={() => handleSubmit()}
        style={accepted ? styles.button : styles.buttonDisabled}>
        <Text style={styles.buttonLabel}>I Agree</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};
const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcP: {
    marginTop: 10,
    fontSize: 12,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
};
export default TermsAndConditions;
