import * as ImagePicker from 'expo-image-picker';
import { Keyboard } from 'react-native';

export const BANNER_ASPECT: [number, number] = [3, 1];
const PHOTO_ASPECT: [number, number] = [1, 1];

let picking = false; // the gallery is already opening / open

// Opens the phone's photo library with a crop step in the given shape.
// Returns the picked image's address, or null if the user cancelled.
// Extra taps while the gallery is still opening are ignored, so they can't interfere.
async function pickImage(aspect: [number, number]): Promise<string | null> {
  if (picking) return null;
  picking = true;
  Keyboard.dismiss();
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });
    return result.canceled ? null : (result.assets[0]?.uri ?? null);
  } finally {
    picking = false;
  }
}

export const pickProfilePhoto = () => pickImage(PHOTO_ASPECT);
export const pickBanner = () => pickImage(BANNER_ASPECT);
