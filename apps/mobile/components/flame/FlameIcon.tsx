import { Image } from 'react-native';

import { useColors } from '../../theme';

// Our own flame (traced from the design reference), as two white images the app
// colours in: an outline, and a filled one where only the outer flame is solid and the
// inner flame stays hollow. Both cover exactly the same area, so tapping doesn't jump.
const outline = require('../../assets/images/flame-outline.png');
const filled = require('../../assets/images/flame.png');
const FLAME_RATIO = 238 / 288; // width / height of the images

export type FlameIconProps = {
  size: number; // height
  flamed: boolean; // filled red once you've flamed it
  color?: string; // outline colour before it's flamed (defaults to text)
};

// The flame (DARDANIC's "like"): an outline, filled red once flamed.
export function FlameIcon({ size, flamed, color }: FlameIconProps) {
  const colors = useColors();
  return (
    <Image
      source={flamed ? filled : outline}
      tintColor={flamed ? colors.flame : (color ?? colors.text)}
      style={{ width: size * FLAME_RATIO, height: size }}
      resizeMode="contain"
      accessibilityIgnoresInvertColors
    />
  );
}
