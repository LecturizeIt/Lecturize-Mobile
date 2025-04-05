import { addMinutes } from "date-fns";

export const DATE_NOW = addMinutes(new Date(), 5);

export const DATE_NOW_PLUS_TIRTHY = addMinutes(DATE_NOW, 30);

export const ACCEPTED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/jpg", "image/gif", "image/svg"];