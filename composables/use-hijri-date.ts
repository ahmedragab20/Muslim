import { rootSchema } from '@/schemas/hijir-date';
export default async () => {
  try {
    const date = await useFetch('/api/hijri-date', {
      transform: (data) => rootSchema.parse(data),
    }).then((data) => data.data.value);

    console.log(date);

    return date;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Count not fetch data',
    });
  }
};
