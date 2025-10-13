export const fetchImage = async (url: string) => {
  const options = { headers: { accept: "image/*" }, body: null, }
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Lecture image of url [${url}] was not found`);
  }
  return await res.blob();
}