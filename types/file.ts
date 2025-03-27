export type AcceptedMimeTypes = `${"image"}/${"webp" | "jpeg" | "png"}`;

export type File = {
  name: string,
  type: AcceptedMimeTypes,
}