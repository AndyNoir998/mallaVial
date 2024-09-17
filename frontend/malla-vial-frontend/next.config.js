const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // 'rc-util/es/omit': 'rc-util/lib/omit', // Comentado para pruebas
      };
    }

    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    });

    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');

    return config;
  },
};

module.exports = nextConfig;
