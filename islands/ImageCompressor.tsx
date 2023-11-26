import { Image } from "../database/CompressImage/schema.ts";
import { showFile } from "../utils/file.ts";

export default function ImageCompressor({ data }: any) {
  return (
    <>
      <form method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="max-w-xl lock w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            name="image"
            accept="image/*"
          />
        </div>
        <div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to Cart
          </button>
        </div>
      </form>
      <div className="mt-4 flex justify-center flex-wrap">
        {data.map((img: Image, i: number) => {
          const { originalImage, Resized400, Resized100 }: any = img;
          return (
            <>
              <div className="max-w-lg p-4" key={i}>
                <img
                  className="h-auto max-w-[400px] max-h-[400px] rounded-lg"
                  src={showFile(originalImage)}
                  alt="image description"
                />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  Original Image {i + 1}
                </figcaption>
              </div>
              <div className="max-w-lg p-4" key={i}>
                <img
                  className="h-auto max-w-[400px] max-h-[400px] rounded-lg"
                  src={showFile(Resized400)}
                  alt="image description"
                />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  Resized Image (400x400) {i + 1}
                </figcaption>
              </div>
              <div className="max-w-lg p-4" key={i}>
                <img
                  className="h-auto max-w-[400px] max-h-[400px] rounded-lg"
                  src={showFile(Resized100)}
                  alt="image description"
                />
                <figcaption className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                  Resized Image
                  <br /> (100x100) {i + 1}
                </figcaption>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
