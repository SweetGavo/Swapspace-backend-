import CopyWebpackPlugin from 'copy-webpack-plugin';


export default {
  
  plugins: [
    
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'prisma',
          to: 'dist/prisma',
          noErrorOnMissing: true,
          force: true ,
          info: { minimized: true }
        },
      ],
    }),
  ],
  watch: ['src', 'prisma'],
};
