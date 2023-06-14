// will keep this file accessible to everyone, in case someone else wanted to use the endpoints
export default () => {
  const HIJRI_DATE_API = (date: string) => {
    // date example: DD-MM-YYYY

    return `http://api.aladhan.com/v1/gToH/${date}`;
  };

  return {
    HIJRI_DATE_API,
  };
};
