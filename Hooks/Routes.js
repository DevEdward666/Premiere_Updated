import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Router, Scene, Stack } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Prompt from "../Components/PrompScreen";
import Index from "../Screens/Main/MainNavigation";
// import CalendarEvents from '../Screens/Calendar/UICalendar';
import Diagnostic from "../Screens/Diagnostic/FormDiagnostic";
import DiagnosticRequest from "../Screens/Diagnostic/UIDiagnosticsRequestList";
import DiagnosticsResultsList from "../Screens/Diagnostic/UIDiagnosticsResultsList";
import DiagnosticsResults from "../Screens/Diagnostic/UIDiagnoticsResults";
import MainDiagnosticsUI from "../Screens/Diagnostic/UIMainDiagnostics";
import DoctorInfo from "../Screens/Doctors/DoctorsInfoScreen";
import Login from "../Screens/Login/LoginScreen";
import MyProfile from "../Screens/Me/MeInfoScreen";
import MeScreen from "../Screens/Me/MeScreen";
import LinkMedicalRecords from "../Screens/MedicalRecord/LinkMedicalRecords";
import UIListOfFile from "../Screens/MedicalRecord/UIListOfFile";
import UIMedicalRecords from "../Screens/MedicalRecord/UIMedicalRecords";
import MedicalInfo from "../Screens/MedicalRecord/Information";
import UIPatientFiles from "../Screens/MedicalRecord/UIPatientFiles";
// import Message from '../Screens/Message/Message';
// import VideoCall from '../Screens/Message/VideoCall/VideoCall';
// import VideoCallJisti from '../Screens/Message/VideoCall/VideoCallJisti';
// import QRScreen from '../Screens/MyQRCodeScreen';
import NewsInfo from "../Screens/News/NewsInfo/MainNewsInfo";
import NewsList from "../Screens/News/NewsList/NewsList";
import Otp from "../Screens/OTP/OTPScreen";
// import UIPin from '../Screens/PIN/UIPin';
// import SafeDavaoQR from '../Screens/SafeDavaoQR';
import SignUp from "../Screens/SignUp/MainSignUp";
import tac from "../Screens/Aggreement/TermsAndConditions";
// import UIApps from '../Screens/UIApps/UIApps';
// import IndexQueue from '../Screens/Queing/Queueing';
// import GenerateQueue from '../Screens/Queing/IndexQueue';
// import ViewNumbersonQueue from '../Screens/Queing/QueueNumbers';
import MainClinic from "../Screens/Clinic/MainClinic";
import UIFilePDFView from "../Components/FileViewer/UIFilePDFView";

import ConsultList from "../Screens/Clinic/ConsultationDetails/Main_consult";
import IndexClinic from "../Screens/Clinic/Index";
import UpdateInfoUI from "../Screens/Me/UpdateInfo/UpdateInfoUI";
import FirstInfo from "../Screens/SignUp/FirstInfo";
import SecondInfo from "../Screens/SignUp/SecondInfo";
import ThirdInfo from "../Screens/SignUp/ThirdInfo";
import LastInfo from "../Screens/SignUp/LastInfo";
import UpdateImageUI from "../Screens/Me/UpdateInfo/UpdateImageUI";
import UpdateAddressUI from "../Screens/Me/UpdateInfo/MainAddress";
import SearchConsultationUI from "../Screens/Clinic/SearchConsultation/SearchConsultationUI";
import OTPConsult from "../Screens/Clinic/SearchConsultation/OTP";
import MainInfoConsult from "../Screens/Clinic/Consult_Info/Main";
import Notifications from "../Screens/Notifications/UINotification";
import Events from "../Screens/Calendar/Events/Events";
import ServicesDesc from "../Screens/HospitalServices/ServicesMain";
import PrivacyPolicy from "../Screens/Aggreement/PrivacyPolicy";
import ServiceInfoMain from "../Screens/HospitalServices/ServiceInfo/ServiceInfoMain";
import WaitForStatusUpdate from "../Screens/Me/UpdateInfo/WaitForStatusUpdate";
import DeclinedStatus from "../Screens/Me/UpdateInfo/DeclinedStatus";

import MainPayment from "../Screens/Payments/MainPayment";
import GcashPaymentUI from "../Screens/Payments/Gcash/GcashPaymentUI";
import GrabPayPaymentUI from "../Screens/Payments/GrabPay/GrabPayPaymentUI";
import PayMayaPaymentUI from "../Screens/Payments/PayMaya/PayMayaPaymentUI";
import CardPaymentUI from "../Screens/Payments/Card/MainCardUI";
import ResetPassword from "../Screens/ResetPassword/MainReset/ResetPassword";
import OTPResetPassword from "../Screens/ResetPassword/ResetOTPScreen";
import ForgotPassUI from "../Screens/ResetPassword/ForgotPassword/ForgotPassUI";
import styles from "./style";
const Routes = () => {
  const app_name = useSelector((state) => state.Default_Reducers.app_name);
  return (
    <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
      <Stack key="root">
        <Scene key="home" component={Login} title="Login" hideNavBar={true} />
        <Scene key="signup" component={SignUp} title="Signup" />
        <Scene key="signup_name" component={FirstInfo} title="Name" />
        <Scene key="update_info" component={UpdateInfoUI} title="Update Info" />

        <Scene
          key="forgot_password"
          component={ForgotPassUI}
          title="Forgot Password"
        />
        <Scene
          key="otp_reset_password"
          component={OTPResetPassword}
          title="OTP"
        />
        <Scene
          key="reset_password"
          component={ResetPassword}
          title="Reset Password"
        />
        <Scene
          key="declined_info"
          component={DeclinedStatus}
          title="Declined"
        />
        <Scene
          key="waiting"
          component={WaitForStatusUpdate}
          title="Still on Review"
        />
        <Scene
          key="update_image"
          component={UpdateImageUI}
          title="Update Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="update_address"
          component={UpdateAddressUI}
          title="Update Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="signup_birthdate"
          component={SecondInfo}
          title="Birthdate"
          headerTintColor="#0084FF"
        />
        <Scene key="signup_email" component={ThirdInfo} title="Email" />
        <Scene
          key="signup_credentials"
          component={LastInfo}
          title="Credentials"
          headerTintColor="#0084FF"
        />
        <Scene
          key="otp"
          component={Otp}
          title="One Time Password"
          hideNavBar={true}
        />
        <Scene
          key="tac"
          component={tac}
          title="Terms and Conditions"
          hideNavBar={true}
        />
        <Scene
          key="pap"
          component={PrivacyPolicy}
          title="Privacy and Policy"
          hideNavBar={true}
        />
        <Scene
          key="doctorsinfo"
          component={DoctorInfo}
          title="Doctors Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="service_desc"
          component={ServicesDesc}
          title="Service Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="service_info"
          component={ServiceInfoMain}
          title="Service Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="me"
          component={MeScreen}
          title="Me"
          headerTintColor="#0084FF"
        />
        <Scene
          key="diagnostics"
          component={Diagnostic}
          title="Diagnostics"
          headerTintColor="#0084FF"
        />
        <Scene
          key="diagnosticsresults"
          component={DiagnosticsResults}
          headerTintColor="#0084FF"
          title="Results"
        />
        <Scene
          key="diagnosticsresultslist"
          component={DiagnosticsResultsList}
          headerTintColor="#0084FF"
          title="Results List"
        />
        <Scene
          key="diagnosticsrequest"
          component={DiagnosticRequest}
          title="Diagnostics Request"
          headerTintColor="#0084FF"
        />
        <Scene
          key="maindiagnosticsui"
          component={MainDiagnosticsUI}
          headerTintColor="#0084FF"
          title="Diagnostics"
        />
        <Scene
          key="seemoreevents"
          component={Events}
          title="Events"
          headerTintColor="#0084FF"
        />
        <Scene
          key="gcashpayment"
          component={GcashPaymentUI}
          title="Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="grabpayment"
          component={GrabPayPaymentUI}
          title="Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="mainpayment"
          component={MainPayment}
          title="Payment Method"
          headerTintColor="#0084FF"
        />
        <Scene
          key="cardpayment"
          component={CardPaymentUI}
          title="Card Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="paymayapayment"
          component={PayMayaPaymentUI}
          title="Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="mainclicnic"
          component={MainClinic}
          title="Consultation Request"
          headerTintColor="#0084FF"
        />
        <Scene
          key="indexclinic"
          component={IndexClinic}
          title="Consultation Request"
          headerTintColor="#0084FF"
        />
        <Scene
          key="consultlist"
          component={ConsultList}
          title="Consultation List"
          headerTintColor="#0084FF"
        />
        <Scene
          key="consultinfo"
          component={MainInfoConsult}
          title="Consultation Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="otpconsult"
          component={OTPConsult}
          title="OTP"
          headerTintColor="#0084FF"
        />
        <Scene
          key="searchconsult"
          component={SearchConsultationUI}
          title="Link My Consultation"
          headerTintColor="#0084FF"
        />

        <Scene
          key="prompt"
          component={Prompt}
          title="Alert"
          headerTintColor="#0084FF"
        />
        <Scene
          key="files"
          component={UIPatientFiles}
          title="Files"
          headerTintColor="#0084FF"
        />
        <Scene
          key="pdfviewer"
          component={UIFilePDFView}
          title="File"
          headerTintColor="#0084FF"
        />
        <Scene
          key="listoffile"
          component={UIListOfFile}
          title="List of File"
          headerTintColor="#0084FF"
        />
        <Scene
          key="notif"
          component={Notifications}
          title="Notifications"
          headerTintColor="#0084FF"
        />
        <Scene
          key="link"
          component={LinkMedicalRecords}
          headerTintColor="#0084FF"
          title="Link Medical Records"
        />
        <Scene
          key="medicalrecords"
          component={UIMedicalRecords}
          headerTintColor="#0084FF"
          title="Medical Records"
        />
        <Scene
          key="patientmedicalinfo"
          component={MedicalInfo}
          headerTintColor="#0084FF"
          title="Patient Information"
        />
        <Scene
          key="profile"
          component={MyProfile}
          title="My Profile"
          headerTintColor="#0084FF"
        />
        {/* <Scene
          key="qrscreen"
          component={QRScreen}
          title="My QR"
          headerTintColor="#0084FF"
        />



        <Scene
          key="seemoreevents"
          component={Events}
          title="Events"
          headerTintColor="#0084FF"
        />

       
        <Scene
          key="safedavaoqr"
          component={SafeDavaoQR}
          headerTintColor="#0084FF"
          title="Safe Davao QR"
        />
        <Scene
          key="indexqueue"
          component={IndexQueue}
          title="Queue"
          headerTintColor="#0084FF"
        />
        <Scene
          key="numbersonqueue"
          component={ViewNumbersonQueue}
          headerTintColor="#0084FF"
          title="Numbers On Queue"
        />
        <Scene
          key="generatenumber"
          component={GenerateQueue}
          title="Generate Number"
          headerTintColor="#0084FF"
        />
        <Scene
          key="uiapps"
          component={UIApps}
          title="Apps"
          headerTintColor="#0084FF"
        />
        <Scene
          key="diagnostics"
          component={Diagnostic}
          title="Diagnostics"
          headerTintColor="#0084FF"
        />
       
        <Scene
          key="videocall"
          component={VideoCall}
          title="VideoCall"
          hideNavBar={true}
          headerTintColor="#0084FF"
        />
        <Scene
          key="videocall2"
          component={VideoCallJisti}
          title="VideoCall"
          hideNavBar={true}
          headerTintColor="#0084FF"
        />
        <Scene
          key="message"
          component={Message}
          title="Message"
          headerTintColor="#0084FF"
        />
        <Scene
          key="pin"
          component={UIPin}
          title="PIN"
          hideNavBar={true}
          renderBackButton={() => <View />}
        />


      */}

        {/* <Scene
          key="calendar"
          component={CalendarEvents}
          title="Events"
          headerTintColor="#0084FF"
        /> */}
        <Scene
          key="news_info"
          component={NewsInfo}
          title="News Info"
          headerTintColor="#0084FF"
        />
        <Scene
          key="newslist"
          component={NewsList}
          title="News"
          headerTintColor="#0084FF"
        />
        <Scene
          key="index"
          component={Index}
          title={app_name}
          initial
          hideNavBar={true}
        />
      </Stack>
    </Router>
  );
};
export default Routes;
