import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const SkeletonMe = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        marginLeft={15}
        marginTop={15}>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={50} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default SkeletonMe;
