import * as Sharing from 'expo-sharing';

export default async function openShareDialogAsync(selectedImage) {
if (!(await Sharing.isAvailableAsync())) {
  alert(`Uh oh, sharing isn't available on your platform`);
  return;
}

await Sharing.shareAsync(selectedImage.localUri);
}
