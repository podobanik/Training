import { deleteObject, ref } from 'firebase/storage';
import { storage } from './config.js';

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef);
};

export default deleteFile;
