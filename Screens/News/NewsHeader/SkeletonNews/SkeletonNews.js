import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default function SkeletonNews() {
  return (
    <View>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
          <SkeletonPlaceholder.Item marginTop={20}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={40}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={5}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={200}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={5}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={70}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
          <SkeletonPlaceholder.Item marginTop={20}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={40}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={5}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={200}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={5}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={70}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
          <SkeletonPlaceholder.Item marginTop={20}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={40}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={5}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={200}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={5}>
            <SkeletonPlaceholder.Item
              width={width - 20}
              height={70}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
