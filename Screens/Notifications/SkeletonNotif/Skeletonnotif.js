import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default function Skeletonnotif() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={width}
            height={80}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
