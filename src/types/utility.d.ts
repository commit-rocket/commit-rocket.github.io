export type RequiredKeys<
    T extends object,
    K extends keyof T = keyof T
> = Omit<T, K> & Required<Pick<T, K>>;

export type OptionalKeys<
    T extends object,
    K extends keyof T = keyof T
> = Omit<T, K> & Partial<Pick<T, K>>;

export type Prefix<TKey, TPrefix extends string> = TKey extends string
    ? `${TPrefix}${Capitalize<TKey>}`
    : TKey extends Object
    ? { [K in keyof TKey as `${TPrefix}${Capitalize<K>}`]: TKey[K]; }
    : never;