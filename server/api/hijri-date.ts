import useApis from '../../composables/use-apis';
import { Generics } from '../../utils/generics';

export default defineEventHandler(async (event) => {
  console.log(event.context);

  const currentDate = Generics.formateDate(new Date()) as string;

  const { HIJRI_DATE_API } = useApis();

  const url = HIJRI_DATE_API(currentDate);

  const response = await $fetch(url);

  return response;
});
