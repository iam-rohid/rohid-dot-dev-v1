import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export default function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}
