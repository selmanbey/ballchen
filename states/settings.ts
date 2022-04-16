import { atom } from "recoil";

export const audioOnAtom = atom<boolean>({
  key: "audioOnAtom",
  default: true,
});
