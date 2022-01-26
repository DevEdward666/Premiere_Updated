import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, View, Image} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
const Information = () => {
  const info = useSelector(
    (state) => state.MedicalRecords_Reducers.patientinfo,
  );
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');
  const [docname, setdocname] = useState('');
  useEffect(() => {
    let mounted = true;
    const getdocname = () => {
      if (mounted) {
        setdocname(info?.data?.doccode?.split(','));
      }
    };
    mounted && getdocname();
    return () => {
      mounted = false;
    };
  }, [info?.data?.doccode]);
  console.log(info?.data?.doccode?.split(','));
  return (
    <ScrollView style={{height: height,backgroundColor:"white"}}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.surface}></View>
          <View style={{padding: 10}}>
            <View style={styles.viewstyle}>
              <Text style={styles.headerinfotext}>Patient Info</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}> Patient No. :</Text>
                <Text style={styles.infotext}> Admission Date :</Text>
                <Text style={styles.infotext}> Admission Type :</Text>
                <Text style={styles.infotext}> First Name :</Text>
                <Text style={styles.infotext}> Middle Name :</Text>
                <Text style={styles.infotext}> Last Name :</Text>
                <Text style={styles.infotext}> Birthdate :</Text>
                <Text style={styles.infotext}> Gender :</Text>
                <Text style={styles.infotext}> Age :</Text>
                <Text style={styles.infotext}> Civil Status :</Text>
                <Text style={styles.infotext}> Religion :</Text>
                <Text style={styles.infotext}> Nationality :</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}> {info?.data?.patno}</Text>
                <Text style={styles.infotext}>
                  {moment(info?.data?.admissiondate).format(
                    'MMM D, YYYY hh:mma',
                  )}
                </Text>
                <Text style={styles.infotext}> {info?.data?.medtype}</Text>
                <Text style={styles.infotext}> {info?.data?.firstname}</Text>
                <Text style={styles.infotext}> {info?.data?.middlename}</Text>
                <Text style={styles.infotext}> {info?.data?.lastname}</Text>
                <Text style={styles.infotext}>
                  {moment(info?.data?.birthdate).format('MMM D, YYYY')}
                </Text>
                <Text style={styles.infotext}> {info?.data?.gender}</Text>
                <Text style={styles.infotext}>
                  {info?.data?.Age?.toString()}
                </Text>
                <Text style={styles.infotext}>{info?.data?.civilstatus}</Text>
                <Text style={styles.infotext}>{info?.data?.patreligion}</Text>
                <Text style={styles.infotext}>{info?.data?.nationality}</Text>
              </View>
            </View>
          </View>

          <View style={{padding: 10}}>
            <View style={styles.viewstyle}>
              <Text style={styles.headerinfotext}>Address</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}> Region :</Text>
                <Text style={styles.infotext}> Province :</Text>
                <Text style={styles.infotext}> City :</Text>
                <Text style={styles.infotext}> Barangay :</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}> {info?.data?.regiondesc}</Text>
                <Text style={styles.infotext}>{info?.data?.provincedesc}</Text>
                <Text style={styles.infotext}> {info?.data?.citymundesc}</Text>
                <Text style={styles.infotext}> {info?.data?.barangaydesc}</Text>
              </View>
            </View>
          </View>

          <View style={{padding: 10}}>
            <View style={styles.viewstyle}>
              <Text style={styles.headerinfotext}>Doctors Info</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}> First Name :</Text>
                <Text style={styles.infotext}> Middle Name :</Text>
                <Text style={styles.infotext}> Last Name :</Text>
                <Text style={styles.infotext}> Specialty :</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}>
                  {info?.data?.doccode?.split(',')[0]}
                </Text>
                <Text style={styles.infotext}>
                  {info?.data?.doccode?.split(',')[1]}
                </Text>
                <Text style={styles.infotext}>
                  {info?.data?.doccode?.split(',')[2]}
                </Text>
                <Text style={styles.infotext}>
                  {info?.data?.doccode?.split(',')[3]}
                </Text>
              </View>
            </View>
          </View>

          <View style={{padding: 10}}>
            <View style={styles.viewstyle}>
              <Text style={styles.headerinfotext}>Clinical Summary</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}> Chief Complaint :</Text>
                <Text style={styles.infotext}> Diagnosis :</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Text style={styles.infotext}>{info?.data?.complaint}</Text>
                <Text style={styles.infotext}>{info?.data?.admdiagnosis}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

Information.propTypes = {};

export default Information;
