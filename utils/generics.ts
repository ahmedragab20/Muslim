import axios from 'axios';

export class Generics {
  static uuid(): string | undefined {
    try {
      const data = new Uint8Array(16);
      window.crypto.getRandomValues(data);

      data[6] = (data[6] & 0x0f) | 0x40;
      data[8] = (data[8] & 0x3f) | 0x80;

      const hex = Array.from(data)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');

      const sections = [
        hex.substr(0, 8),
        hex.substr(8, 4),
        hex.substr(12, 4),
        hex.substr(16, 4),
        hex.substr(20, 12),
      ];

      return sections.join('-');
    } catch (error) {
      Debug.error({
        message: '🚨 Error generating uuid',
        source: 'utils/generics.ts',
        data: error,
        useOnProduction: true,
      });
    }
  }
  static valuesMatch<T>(a: T, b: T): boolean {
    if (!a || !b) {
      Debug.warn({
        message: '🚨 Error comparing values',
        data: { a, b },
      });
    }

    return JSON.stringify(a) === JSON.stringify(b);
  }
  static getObjectInfoSeparate(obj: object) {
    if (!obj) {
      Debug.error({
        message: '🚨 Error getting object info',
        source: 'utils/generics.ts',
        data: obj,
      });

      return;
    }

    const keys = Object.keys(obj);
    const values = Object.values(obj);
    return { keys, values };
  }
  static dateSince(date: Date): string {
    if (!date) {
      Debug.error({
        message: '🚨 Error getting date',
        source: 'utils/generics.ts',
        data: date,
        useOnProduction: true,
      });

      throw createError({
        message: '🚨 Error getting date',
        statusCode: 500,
      });
    }

    const originalDate: Date = this.getObjectInfoSeparate(date)?.keys?.includes('seconds')
      ? // @ts-ignore
        new Date(date.seconds * 1000)
      : date;

    // Get the current date and time
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds between the current date and the input date
    const timeDiff: number = currentDate.getTime() - originalDate.getTime();

    // Convert the time difference from milliseconds to seconds
    const seconds: number = Math.floor(timeDiff / 1000);

    // Convert seconds to minutes
    const minutes: number = Math.floor(seconds / 60);

    // Convert minutes to hours
    const hours: number = Math.floor(minutes / 60);

    // Convert hours to days
    const days: number = Math.floor(hours / 24);

    // Convert days to weeks
    const weeks: number = Math.floor(days / 7);

    // Convert weeks to months (approximate)
    const months: number = Math.floor(weeks / 4.348);

    // Convert months to years
    const years: number = Math.floor(months / 12);

    // Create a string to represent the time since the input date
    let result: string = '';

    if (years > 0) {
      result += `${years % 365.25}y`;
    }

    if (months > 0) {
      if (result.length > 0) {
        result += ', ';
      }
      result += `${months % 12}mo`;
    }

    if (weeks > 0) {
      if (result.length > 0) {
        result += ', ';
      }
      result += `${weeks % 7}w`;
    }

    if (days > 0) {
      if (result.length > 0) {
        result += ', ';
      }
      result += `${days}d`;
    }

    if (hours > 0) {
      if (result.length > 0) {
        result += ', ';
      }
      result += `${hours % 24}h`;
    }

    if (minutes > 0) {
      if (result.length > 0) {
        result += ', ';
      }
      result += `${(minutes % 60)?.toFixed(0) !== '0' ? `${(minutes % 60)?.toFixed(0)}m` : ''}`;
    }

    // Return the resulting string
    return result.length > 0 ? result + ' ago' : 'just now';
  }
  static allDataValid<T>(obj: T): boolean {
    if (!obj || typeof obj !== 'object') {
      Debug.error({
        message: '🚨 Error validating values',
        source: 'utils/generics.ts',
        data: obj,
      });

      return false;
    }

    // check if all values are valid
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      const value = obj[key];

      if (Array.isArray(value) && value.length === 0) {
        return false;
      }

      if (typeof value === 'string' && !value.trim()) {
        return false;
      }

      if (typeof value === 'number' && value === 0) {
        return false;
      }

      if (typeof value === 'object' && Object.keys(value as object).length === 0) {
        return false;
      }

      if (typeof value === 'boolean' && !value) {
        return false;
      }
    }

    return true;
  }
  static clone = <T>(obj: T): T => {
    if (!obj) {
      Debug.error({
        message: '🚨 Error cloning object',
        source: 'utils/generics.ts',
        data: obj,
      });

      throw createError({
        message: '🚨 Error cloning object',
        statusCode: 500,
      });
    }

    return JSON.parse(JSON.stringify(obj));
  };
  static formatNumber = (number: number): string => {
    if (!number) {
      Debug.error({
        message: '🚨 Error formatting number',
        source: 'utils/generics.ts',
        data: number,
      });

      throw createError({
        message: '🚨 Error formatting number',
        statusCode: 500,
      });
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  static sortByDate = (a: Date, b: Date): number => {
    //TODO: Refactor this
    if (!a || !b) {
      Debug.error({
        message: '🚨 Error sorting dates',
        source: 'utils/generics.ts',
        data: { a, b },
      });

      throw createError({
        message: '🚨 Error sorting dates',
        statusCode: 500,
      });
    }

    const originalDateA: Date = this.getObjectInfoSeparate(a)?.keys?.includes('seconds')
      ? // @ts-ignore
        new Date(a.seconds * 1000)
      : a;

    const originalDateB: Date = this.getObjectInfoSeparate(b)?.keys?.includes('seconds')
      ? // @ts-ignore
        new Date(b.seconds * 1000)
      : b;

    return originalDateA.getTime() - originalDateB.getTime();
  };
  static formateDate = (date: Date): string => {
    if (!date || typeof date !== 'object') {
      return '';
    }

    const currentDate = new Date();

    // Extract day, month, and year
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();

    // Create the formatted date string
    const formattedDate = day + '-' + month + '-' + year;

    return formattedDate ? formattedDate : date?.toLocaleDateString();
  };
  static isArabicText(text: string): boolean {
    // Regular expression to check if the text contains Arabic characters
    const arabicRegex = /[\u0600-\u06FF]/;

    return arabicRegex.test(text);
  }
  /**
   * Encodes Arabic text if it contains Arabic characters, otherwise returns the text as it is.
   * @param {string} text - The text to be encoded if it contains Arabic characters.
   * @returns {string} The encoded Arabic text, or the original text if it's in English.
   */
  static encodeArabicText(text: string): string {
    if (Generics.isArabicText(text)) {
      // Text contains Arabic characters, so encode it
      return encodeURIComponent(text);
    } else {
      // Text is in English, so send it as it is
      return text;
    }
  }
  static copyToClipboard = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!text) {
        Debug.error({
          message: '🚨 Error copying text to clipboard',
          source: 'utils/generics.ts',
          data: text,
        });

        reject(
          createError({
            message: '🚨 Error copying text to clipboard',
            statusCode: 500,
          })
        );
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  static async downloadFile(url: string): Promise<void> {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'blob',
    });
    const fileName = url.split('/').pop();
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a')! as HTMLAnchorElement;
    link.href = downloadUrl;
    link.download = fileName!;
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
  }
  static calculatePercentage(number: number, reference: number): number {
    if (reference === 0) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Reference number cannot be zero.',
      });
    }

    return (number / reference) * 100;
  }
  static convertToMinutes(number: number): number {
    return Math.floor(number / 60);
  }
  static convertPercentageToSeconds(percentage: number, totalDuration: number): number {
    const timeInSeconds = (percentage / 100) * totalDuration;
    return timeInSeconds;
  }
  static formatTimeProgress(seconds: number, totalDuration: number): string {
    const currentMinutes = Generics.convertToMinutes(seconds) || 0;
    const totalMinutes = Generics.convertToMinutes(totalDuration) || 0;
    const currentSeconds = seconds % 60 || 0;
    const totalSeconds = totalDuration % 60 || 0;

    return `${currentMinutes}:${currentSeconds.toFixed(0)} / ${totalMinutes}:${totalSeconds.toFixed(
      0
    )}`;
  }
}
