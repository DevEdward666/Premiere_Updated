import React, {Component, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {Card} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import * as Progress from 'react-native-progress';
import {
  action_download_file,
  action_download_percent,
} from '../../Services/Actions/DefaultActions';

const CustomFileViewer = ({fileurl, filename}) => {
  const [progress, setprogress] = useState(0);
  const [getdownload, setdownload] = useState(false);
  const dispatch = useDispatch();
  const onPress = useCallback(async () => {
    setdownload(true);
    const url = fileurl;
    const f2 = url.split('/');
    const fileName = f2[f2.length - 1];
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
      background: true,
      discretionary: true,
      cacheable: true,
      progress: res => {
        console.log('Response written ===\n\n');
        let progressPercent = (res.bytesWritten / res.contentLength) * 100;
        // console.log('\n\nprogress===', progressPercent);
        setprogress(progressPercent);
        // console.log(res);
        dispatch(action_download_percent(progressPercent));
      },
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        setdownload(false);
        setprogress(0);
      })
      .catch(error => {
        setdownload(false);
        setprogress(0);
        console.log(error);
      });
  }, []);
  return (
    <>
      {getdownload ? (
        <Progress.Circle
          showsText={true}
          animated={true}
          progress={progress}
          size={200}
          style={{alignSelf: 'center'}}
        />
      ) : (
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor: 'white', padding: 10, width: '100%'}}>
            <Card style={{width: '100%', height: 30}}>
              <Text style={{fontSize: 12, padding: 5, width: '100%'}}>
                {filename}
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default CustomFileViewer;
