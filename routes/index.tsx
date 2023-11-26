import { Handlers, Status } from "$fresh/server.ts";
import {
  createCompressedImage,
  fetchCompressedImages,
} from "../database/CompressImage/operations.ts";
import ImageCompressor from "../islands/ImageCompressor.tsx";
import {  UploadAndCompress } from "../utils/file.ts";

export const handler: Handlers = {
  async POST(req, ctx: any) {
    try {
      const formData = await req.formData();
      const image = formData.get("image") as File;
      const imageUrl = await UploadAndCompress(image);
      await createCompressedImage({
        originalImage: imageUrl.Original,
        Resized400:imageUrl.Resized400,
        Resized100:imageUrl.Resized100,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return new Response(undefined, {
        status: Status.Found,
        headers: {
          location: "/",
        },
      });
    } catch (error) {
      console.error(error);
      return ctx.response;
    }
  },
  async GET(_req, ctx: any) {
    try {
      const images = await fetchCompressedImages();
      return await ctx.render(images);
    } catch (error) {
      console.error(error);
    }
  },
};

export default function Home({ data }: any) {
  return (
    <div class="p-8">
      <ImageCompressor data={data} />
    </div>
  );
}
