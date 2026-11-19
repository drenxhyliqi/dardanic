import { useState } from 'react';
import { Image, StyleSheet, View, type ImageProps } from 'react-native';

import { Skeleton } from './Skeleton';

export type LoadingImageProps = Omit<ImageProps, 'style'> & {
  radius?: number;
};

// An image that fills its parent and shows a pulsing skeleton until it has loaded.
// Use for anything not bundled with the app (picked photos, images from the server).
export function LoadingImage({ radius = 0, onLoadEnd, ...imageProps }: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={styles.fill}>
      <Image
        {...imageProps}
        style={styles.fill}
        onLoadEnd={() => {
          setLoaded(true);
          onLoadEnd?.();
        }}
      />
      {!loaded && <Skeleton radius={radius} style={StyleSheet.absoluteFill} />}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    width: '100%',
    height: '100%',
  },
});
