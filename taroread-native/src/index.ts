import { registerPlugin } from '@capacitor/core';

import type { TaroreadNativePlugin } from './definitions';

const TaroreadNative = registerPlugin<TaroreadNativePlugin>('TaroreadNative', {
  web: () => import('./web').then(m => new m.TaroreadNativeWeb()),
});

export * from './definitions';
export { TaroreadNative };
