import * as ImagePicker from 'expo-image-picker';
import { Keyboard } from 'react-native';

export const BANNER_ASPECT: [number, number] = [3, 1];
const PHOTO_ASPECT: [number, number] = [1, 1];

let picking = false; // the gallery is already opening / open

// Opens the phone's photo library, with a crop step in the given shape (or no crop
// step when no shape is given). Returns the picked image's address, or null if the
// user cancelled. Extra taps while the gallery is still opening are ignored.
async function pickImage(aspect?: [number, number]): Promise<string | null> {
  if (picking) return null;
  picking = true;
  Keyboard.dismiss();
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: Boolean(aspect),
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
export const pickChatPhoto = () => pickImage(); // as it is, no crop
export const pickListingPhoto = () => pickImage(PHOTO_ASPECT); // square, like the grid

const MAX_CHAT_PHOTOS = 10;

// Chats: pick one or more photos from the library at once (no crop). [] if cancelled.
export async function pickChatPhotos(): Promise<string[]> {
  if (picking) return [];
  picking = true;
  Keyboard.dismiss();
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_CHAT_PHOTOS,
      quality: 0.8,
    });
    return result.canceled ? [] : result.assets.map((asset) => asset.uri);
  } finally {
    picking = false;
  }
}

// Chats: take a photo with the camera right now. null if cancelled, not allowed, or
// there's no camera (e.g. the iOS Simulator).
export async function takeChatPhoto(): Promise<string | null> {
  if (picking) return null;
  picking = true;
  Keyboard.dismiss();
  try {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return null;
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 });
    return result.canceled ? null : (result.assets[0]?.uri ?? null);
  } catch {
    return null;
  } finally {
    picking = false;
  }
}

const MAX_STORY_SECONDS = 15;

export type StoryMedia = { uri: string; kind: 'photo' | 'video'; durationMs?: number };

// Stories: one photo or video (up to 15 s) from the library. null if cancelled.
export async function pickStoryMedia(): Promise<StoryMedia | null> {
  if (picking) return null;
  picking = true;
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      videoMaxDuration: MAX_STORY_SECONDS,
      quality: 0.9,
    });
    const asset = result.canceled ? undefined : result.assets[0];
    if (!asset) return null;
    return asset.type === 'video'
      ? { uri: asset.uri, kind: 'video', durationMs: asset.duration ?? undefined }
      : { uri: asset.uri, kind: 'photo' };
  } finally {
    picking = false;
  }
}
