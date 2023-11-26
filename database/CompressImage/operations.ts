import { Image } from "./schema.ts";
import { db } from "../connection.ts";

const imageCollection = db?.collection<Image>("images");

export async function createCompressedImage(params: Image) {
  try {
    const createCompressImage = await imageCollection.insertOne(params);
    return createCompressImage.toString();
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchCompressedImages() {
  try {
    const images = await imageCollection.find();
    return images.toArray();
  } catch (error) {
    console.error(error);
  }
}