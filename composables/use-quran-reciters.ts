// Credits: https://quranicaudio.com/

export default () => {
  const abdulbasit_mujawwad = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 0
    return {
      name: {
        en: 'Abdul Basit Abdul Samad',
        ar: 'عبد الباسط عبد الصمد',
      },
      type: {
        en: 'Mujawwad',
        ar: 'مجود',
      },
      url: `https://download.quranicaudio.com/qdc/abdul_baset/mujawwad/${surah}.mp3`,
      poster: '/reciters/Abdelbasset-abdessamad.jpeg',
    };
  };
  const abdulbasit_murattal = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 0
    return {
      name: {
        en: 'Abdul Basit Abdul Samad',
        ar: 'عبد الباسط عبد الصمد',
      },
      type: {
        en: 'Murattal',
        ar: 'مرتل',
      },
      url: `https://download.quranicaudio.com/qdc/abdul_baset/murattal/${surah}.mp3`,
      poster: '/reciters/Abdelbasset-abdessamad.jpeg',
    };
  };

  const hosari = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 000
    const surahNumber = surah.toString().padStart(3, '0');
    return {
      name: {
        en: 'Mahmoud Khaleel Al-Husary',
        ar: 'محمود خليل الحصري',
      },
      url: `https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree_iza3a/${surahNumber}.mp3`,
      poster: '/reciters/al-hosari.jpeg',
    };
  };
  const minshawi_murattal = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 000
    const surahNumber = surah.toString().padStart(3, '0');
    return {
      name: {
        en: 'Muhammad Siddiq Al-Minshawi',
        ar: 'محمد صديق المنشاوي',
      },
      type: {
        en: 'Murattal',
        ar: 'مرتل',
      },
      url: `https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/${surahNumber}.mp3`,
      poster: '/reciters/minshawi.jpeg',
    };
  };
  const minshawi_mujawwad = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 000
    const surahNumber = surah.toString().padStart(3, '0');
    return {
      name: {
        en: 'Muhammad Siddiq Al-Minshawi',
        ar: 'محمد صديق المنشاوي',
      },
      type: {
        en: 'Mujawwad',
        ar: 'مجود',
      },
      url: `https://download.quranicaudio.com/quran/minshawi_mujawwad/${surahNumber}.mp3`,
      poster: '/reciters/minshawi.jpeg',
    };
  };
  const alqatami = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 000
    const surahNumber = surah.toString().padStart(3, '0');
    return {
      name: {
        en: 'Nasser Alqatami',
        ar: 'ناصر القطامي',
      },
      url: `https://download.quranicaudio.com/quran/nasser_bin_ali_alqatami/${surahNumber}.mp3`,
      poster: '/reciters/alqatami.jpeg',
    };
  };
  const afasy = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 000
    const surahNumber = surah.toString().padStart(3, '0');
    return {
      name: {
        en: 'Mishary Alafasy',
        ar: 'مشاري العفاسي',
      },
      url: `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${surahNumber}.mp3`,
      poster: '/reciters/afasy.jpeg',
    };
  };

  return {
    abdulbasit_mujawwad,
    abdulbasit_murattal,
    hosari,
    minshawi_mujawwad,
    minshawi_murattal,
    alqatami,
    afasy,
  };
};
