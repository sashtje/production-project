import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';

import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };

  config.resolve!.modules = [paths.src, 'node_modules'];
  config.resolve!.extensions!.push('.ts', '.tsx');
  config.resolve!.alias = {
    ...config.resolve!.alias,
    '@': paths.src,
  };

  // eslint-disable-next-line no-param-reassign
  // @ts-ignore
  config.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    // По дефолту в сторибучной сборке стоит другой лоадер для SVG, мы используем svgr, поэтому необходимо его подменить
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/ };
    }

    return rule;
  });

  config.module!.rules.push(
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  );
  config.module!.rules.push(buildCssLoader(true));

  config.plugins!.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify('http://testapi.ru'),
    __PROJECT__: JSON.stringify('storybook'),
  }));

  return config;
};
