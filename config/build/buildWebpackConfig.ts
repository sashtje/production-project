import webpack from "webpack";

import {BuildOptions} from "./types/config";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const {entry, build, html} = paths;

    return {
        mode,
        entry,
        output: {
            filename: "[name].[contenthash].js",
            path: build,
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders()
        },
        resolve: buildResolvers()
    };
}