/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-expressions */
import { v4 as uuidv4 } from "uuid";

export function checkIsShowAvatar(array, userId, index) {
  if (array[index].forwardedUser) return false;
  if (array[index].fkSenderId !== userId) return true;
  return false;
}

export const scrollTop = (ref) => {
  // let element = document.getElementById('messages');
  // element?.scrollTo({
  //   top: 10,
  //   behavior: 'smooth',
  // });
};

export function settingFilesObject(file, setFiles) {
  const result = {};
  if (file && file.length) {
    Object.values(file).forEach((element) => {
      const key = uuidv4();
      result[key] = element;
    });
  }
  setFiles((prev) => ({ ...prev, ...result }));
}
