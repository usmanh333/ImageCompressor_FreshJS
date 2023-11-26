// import decode from "https://deno.land/x/wasm_image_decoder@v0.0.7/mod.js";
import { ensureDir, ensureFile } from "https://deno.land/std@0.204.0/fs/mod.ts";
import { resize } from "https://deno.land/x/deno_image@0.0.4/mod.ts";

export const IMAGE_DIR = "images";
export const FILE_API = "/api/file-stream";

export function showFile(image: string) {
  return `${FILE_API}/?file=${image}`;
}

// async function getDimensionsAndRatio(filePath: string) {
//   const image: any = await decode(filePath);
//   const width = image.width;
//   const height = image.height;
//   const ratio = width / height;
//   console.log(`Image dimensions: ${width}x${height}`);
//   console.log(`Image aspect ratio: ${ratio}`);
// }

export async function UploadAndCompress(image: any) {
  const IMAGE_DIR = "./images";
  const isExist: any = await ensureDir(IMAGE_DIR);
  if (!isExist) {
    await ensureDir(IMAGE_DIR);
  }
  const filename = `${Date.now()}-${image.name}`;
  const filePath = `${IMAGE_DIR}/${filename}`;
  const fileExtension = image.name.split(".").pop() || "jpg";
  const originalFilePath = `${IMAGE_DIR}/${
    filename.replace(/\.[^/.]+$/, `_Original.${fileExtension}`)
  }`;
  const arrBuffer = await image.arrayBuffer();
  const uint8Array = new Uint8Array(arrBuffer);

  await ensureFile(originalFilePath);
  await Deno.writeFile(originalFilePath, uint8Array);

  const resizedFilePath1 = filePath.replace(
    /\.[^/.]+$/,
    `_400x400.${fileExtension}`,
  );
  const resizedFilePath2 = filePath.replace(
    /\.[^/.]+$/,
    `_100x100.${fileExtension}`,
  );

  const resizedImage1 = await resize(uint8Array, { width: 400, height: 400 });
  await ensureFile(resizedFilePath1);
  await Deno.writeFile(resizedFilePath1, resizedImage1);

  const resizedImage2 = await resize(uint8Array, { width: 100, height: 100 });
  await ensureFile(resizedFilePath2);
  await Deno.writeFile(resizedFilePath2, resizedImage2);

  return {
    Original: filename.replace(/\.[^/.]+$/, `_Original.${fileExtension}`),
    Resized400: resizedFilePath1.replace(`${IMAGE_DIR}/`, ""),
    Resized100: resizedFilePath2.replace(`${IMAGE_DIR}/`, ""),
  };
}

// export async function fileUpload(file: File) {
//   const isExist = await exists(IMAGE_DIR);
//   if (!isExist) {
//     Deno.mkdir(IMAGE_DIR);
//   }

//   const arrBBuffer = await file?.arrayBuffer();
//   const uintAABuffer = new Uint8Array(arrBBuffer);
//   const filename = `${Date.now()}-${file?.name}`;
//   Deno.writeFile(`${IMAGE_DIR}/${filename}`, uintAABuffer, {
//     create: true,
//   });
//   return filename;
// }

// export async function UploadAndCompress(image: any) {
//   const IMAGE_DIR = "./images";
//   const isExist: any = await ensureDir(IMAGE_DIR);
//   if (!isExist) {
//     await ensureDir(IMAGE_DIR);
//   }
//   const filename = `${Date.now()}-${image.name}`;
//   const filePath = `${IMAGE_DIR}/${filename}`;
//   const arrBuffer = await image.arrayBuffer();
//   const uint8Array = new Uint8Array(arrBuffer);
//   await getDimensionsAndRatio(arrBuffer);
//   const resizedImage = await resize(uint8Array, { width: 400, height: 400 });
//   Deno.writeFileSync(filePath, resizedImage);
//   return filename;
// }

// export async function fileUpload(file: File) {
//   const isExist = await exists(IMAGE_DIR);
//   if (!isExist) {
//     Deno.mkdir(IMAGE_DIR);
//   }

//   const arrBBuffer = await file?.arrayBuffer();
//   const uintAABuffer = new Uint8Array(arrBBuffer);
//   const filename = `${Date.now()}-${file?.name}`;
//   Deno.writeFile(`${IMAGE_DIR}/${filename}`, uintAABuffer, {
//     create: true,
//   });
//   return filename;
// }

// export async function deleteFile(file: string) {
//   try {
//     const isExist = await exists(`${IMAGE_DIR}/${file}`);
//     if (isExist) {
//       Deno.remove(`${IMAGE_DIR}/${file}`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function exists(path: string) {
  try {
    await Deno.stat(path);
    return true;
  } catch (_error) {
    return false;
  }
}
