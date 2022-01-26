import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import FbGrid from "react-native-fb-image-grid";
import ImageView from "react-native-image-viewing";
import styles from "./style";
const ImageViewer = () => {
  const announcement_images = useSelector(
    (state) => state.Announcement_Reducers.announcement_images
  );
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
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
        style={styles.announcement_image}
        images={announcement_images?.map((i) => `${base_url}/${i?.img}`)}
        onPress={onPress}
      />
    </>
  );
};
export default ImageViewer;
