import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import FbGrid from 'react-native-fb-image-grid';
import ImageView from 'react-native-image-viewing';
const ImageViewer = () => {
  const news_image = useSelector((state) => state.News_Reducers.news_image);
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const [IsVisble, setIsVisble] = useState(false);
  const [images, setimages] = useState([]);
  const onPress = (url, index, event) => {
    setIsVisble(true);
    setimages([
      {
        uri: url,
      },
    ]);
  };
  return (
    <>
      <ImageView
        images={images}
        imageIndex={0}
        visible={IsVisble}
        onRequestClose={() => setIsVisble(false)}
      />
      <FbGrid
        images={news_image?.data?.map(
          (i) => `${news_reducers_url}/${i?.news_image}`,
        )}
        onPress={onPress}
      />
    </>
  );
};
export default ImageViewer;
