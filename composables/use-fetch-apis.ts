import { dateSchema } from '@/schemas/hijir-date';
export default () => {
  const fetchHijriDate = () => {
    try {
      const { data: date } = useLazyFetch('/api/hijri-date', {
        transform: (data) => dateSchema.parse(data),
      });

      return date;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Count not fetch data',
      });
    }
  };

  return {
    fetchHijriDate,
  };
};
