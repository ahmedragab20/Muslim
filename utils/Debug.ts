interface Payload {
  message: string;
  style?: string;
  data?: any;
  source?: string;
  useOnProduction?: boolean;
}

export default class Debug {
  static log(payload: Partial<Payload>) {
    if (process.env.NODE_ENV !== 'development' && !payload.useOnProduction) return;

    console.log(
      `%c${payload.message || '🎉'} ${payload.source ? `(${payload.source})` : ''}`,
      `${
        payload.style ||
        'padding: 2px; font-weight: bold; color: brown; border-radius: 2px; background-color: #f5f5f5;'
      }`,
      payload.data
    );
  }
  static warn(payload: Partial<Payload>) {
    if (process.env.NODE_ENV !== 'development' && !payload.useOnProduction) return;

    console.warn(
      `%c${payload.message || '🚧'} ${payload.source ? `(${payload.source})` : ''}`,
      `${
        payload.style ||
        'padding: 2px; font-weight: bold; color: #000; border-radius: 2px; background-color: #ded3afa5;'
      }`,
      payload.data
    );
  }
  static error(payload: Partial<Payload>) {
    if (process.env.NODE_ENV !== 'development' && !payload.useOnProduction) return;

    console.error(
      `%c${payload.message || '🚨'} ${payload.source ? `(${payload.source})` : ''}`,
      `${
        payload.style ||
        'padding: 2px; font-weight: bold; color: #fff; border-radius: 2px; background-color: #f44336;'
      }`,
      payload.data
    );
  }
}
