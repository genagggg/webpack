
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = 'production' | 'development'

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default(env: EnvVariables) => {// env в peckage.json
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development', // Мод сборки prodaction, development
    entry: path.resolve(__dirname, 'src', 'index.tsx'), // Путь до Энтри файла, точка входа в наше приложение
    output: { // Путь в какую папку будет сохраняться бандл
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',// Имя бандла которое будет браться из хеша
      clean: true // Сомостоятельно удаляет предыдущие бандлы
    },
    plugins: [
      new HtmlWebpackPlugin.default({ template: path.resolve(__dirname, 'public', 'index.html') }),//Плагин который вставляет скрипты в нашу html сборку
      isDev && new webpack.ProgressPlugin(),
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    ],
    module: {
      rules: [//Это сам Лоадер 
        {
          test: /\.tsx?$/,//Регулярное выражение, формат файла
          use: 'ts-loader',//Название Лоадера
          exclude: /node_modules/,// Папка которую лоадер не обрабатывает
        },
        {
          test:  /\.s[ac]ss$/i,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                exportLocalsConvention: 'as-is',
              },
            },
          },, "sass-loader",],
        },
      ],
      
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],//Окончания которые можно не писать в import
    },
    devtool: isDev && 'inline-source-map',// Инструмент для обработки ошибок
    devServer: isDev ? { //ДевСервер позволяет при сохранениии видеть изменения без перезагрузки в терминале.
        port: env.port ?? 3000,// Порт на котором поднимается сервер
        open: true
    }: undefined,
 
  };
  return config
}