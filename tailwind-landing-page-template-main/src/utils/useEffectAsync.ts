import { useEffect } from 'react';

export interface AsyncEffectArg {
  canceled: boolean;
}

export function useEffectAsync(callback: (arg: AsyncEffectArg) => void | Promise<void>, deps: any[]) {
  useEffect(() => {
    const arg: AsyncEffectArg = {
      canceled: false,
    };

    callback(arg);
    return () => {
      arg.canceled = true;
    };
  }, deps);
}