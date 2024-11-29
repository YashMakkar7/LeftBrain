// atoms/contentTypeAtom.ts
import { atom } from "recoil";

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document"
}

export const contentTypeAtom = atom<ContentType>({
  key: "contentType", // Unique key for the atom
  default: ContentType.Youtube, // Default value
});
