import useApis from '../../composables/use-apis';
import { HijriDate } from '../../types/server-schemas/hijri-date';
import { Generics } from '../../utils/generics';

export default defineEventHandler(async () => {
  const currentDate = Generics.formateDate(new Date()) as string;

  const { HIJRI_DATE_API } = useApis();

  const url = HIJRI_DATE_API(currentDate);

  const response: HijriDate = await $fetch(url);

  if (response.status?.toLocaleLowerCase() === 'ok') {
    const day = response.data.hijri.weekday;
    const month = response.data.hijri.month;
    const year = response.data.hijri.year;

    return {
      day: {
        dayNumber: response.data.hijri.day,
        ...day,
      },
      month,
      year,
    };
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: 'Wrong response',
    });
  }
});
