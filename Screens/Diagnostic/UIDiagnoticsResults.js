import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useRef} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {action_get_diagnostics_singleresults_pdf} from '../../Services/Actions/MedicalRecords_Actions';
import PDFView from 'react-native-view-pdf';
import SkeletonPDF from './SkeletonDiagnostics/SkeletonPDF';
import {SafeAreaView} from 'react-native';
import {TouchableHighlight} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
const UIDiagnoticsResults = (props) => {
  const diagnostic_url = useSelector((state) => state.Diagnostic_Reducers.url);
  const ftp_base64_pdf = useSelector(
    (state) => state.FTP_Reducers.ftp_base64_pdf,
  );
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
  });
  const [resurls, setresurls] = useState('');
  const [pdfbase64, setpdfbase64] = useState('');
  const [pdfloaded, setpdfloaded] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [spinner, setspinner] = useState(false);

  const geturl = async () => {
    let mounted = true;
    if (mounted) {
      try {
        const resurl = await AsyncStorage.getItem('resurl');
        if (resurl !== null) {
          setresurls(resurl);
        }
      } catch (e) {
        alert('Failed to fetch the data from storage');
      }
    }
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    let mounted = true;
    const loadpdf = async () => {
      if (mounted) {
        if (ftp_base64_pdf?.loading) {
          await setpdfbase64(ftp_base64_pdf?.data);
          await setpdfloaded(true);
        }
      }
    };
    mounted && loadpdf();
    return () => {
      mounted = false;
    };
  }, [ftp_base64_pdf?.loading, dispatch]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      geturl();
      dispatch(action_get_diagnostics_singleresults_pdf(resurls));
    }
    return () => {
      mounted = false;
    };
  }, [resurls, dispatch]);
  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'test-pdf.pdf'
        : '/sdcard/DCIM/Premiere/SOA_00745411.pdf',
    url: `${diagnostic_url}/${resurls}`,
    base64: pdfbase64,
  };
  const resourceType = 'base64';
  const onRefresh = React.useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setspinner(true);
      await dispatch(action_get_diagnostics_singleresults_pdf(resurls));
      if (ftp_base64_pdf?.loading) {
        await setpdfbase64(ftp_base64_pdf?.data);
        await setpdfloaded(true);
        await setspinner(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, resurls, ftp_base64_pdf?.data]);
  return (
    <View
      style={{flex: 1, marginTop: 30}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Spinner
        visible={spinner}
        textContent={'Refreshing Files'}
        textStyle={styles.spinnerTextStyle}
      />
      {pdfloaded ? (
        <>
          <View style={{alignItems: 'flex-end', marginEnd: 30, paddingTop: 10}}>
            <TouchableHighlight
              onPress={() => onRefresh()}
              underlayColor="white">
              <Text>
                <Icons name="refresh" size={15} color="grey" /> Sync
              </Text>
            </TouchableHighlight>
          </View>
          <PDFView
            fadeInDuration={3000.0}
            style={{flex: 1}}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={(e) => console.log(resurls)}
            onError={(e) => console.log(e)}
          />
        </>
      ) : (
        <SkeletonPDF />
      )}
    </View>
  );
};

export default UIDiagnoticsResults;
