// export const url = `https://api.divandioneapp.com`;
export const url = `http://10.0.60.189:5005`;
export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith("/")
      ? `${url}${image}`
      : `${url}/${image}`
    : `https://placehold.co/400`;
};
