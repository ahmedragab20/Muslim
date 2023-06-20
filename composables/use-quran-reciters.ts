// Credits: https://quranicaudio.com/

export default () => {
  const abdulbasit = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 0
    return {
      murattal: {
        name: {
          en: 'Abdul Basit Abdul Samad',
          ar: 'عبد الباسط عبد الصمد',
        },
        type: {
          en: 'Murattal',
          ar: 'مرتل',
        },
        url: `https://download.quranicaudio.com/qdc/abdul_baset/murattal/${surah}.mp3`,
      },
      mujawwad: {
        name: {
          en: 'Abdul Basit Abdul Samad',
          ar: 'عبد الباسط عبد الصمد',
        },
        type: {
          en: 'Mujawwad',
          ar: 'مجود',
        },
        url: `https://download.quranicaudio.com/qdc/abdul_baset/mujawwad/${surah}.mp3`,
      },
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
    };
  };
  const minshawi = (surah: number) => {
    if (!surah || surah < 1 || surah > 114)
      throw createError({
        statusCode: 400,
        statusMessage: 'Surah number is invalid',
      });

    // number format: 000
    const surahNumber = surah.toString().padStart(3, '0');
    return {
      murattal: {
        name: {
          en: 'Muhammad Siddiq Al-Minshawi',
          ar: 'محمد صديق المنشاوي',
        },
        type: {
          en: 'Murattal',
          ar: 'مرتل',
        },
        url: `https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/${surahNumber}.mp3`,
      },
      mujawwad: {
        name: {
          en: 'Muhammad Siddiq Al-Minshawi',
          ar: 'محمد صديق المنشاوي',
        },
        type: {
          en: 'Mujawwad',
          ar: 'مجود',
        },
        url: `https://download.quranicaudio.com/quran/minshawi_mujawwad/${surahNumber}.mp3`,
      },
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
    };
  };

  return {
    abdulbasit,
    hosari,
    minshawi,
    alqatami,
    afasy,
  };
};
