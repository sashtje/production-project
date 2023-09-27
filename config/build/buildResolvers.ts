import { ResolveOptions } from 'webpack';

import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
  const { src } = options.paths;

  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@': src,
    },
  };
}
