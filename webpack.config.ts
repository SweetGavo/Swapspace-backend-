import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
  // Other Webpack configuration options...
  plugins: [
    // Other plugins...
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'prisma',
          to: 'dist/prisma',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  watch: ['src', 'prisma'],
};
