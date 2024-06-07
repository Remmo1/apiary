const webpack=require('webpack');
const dotenv=require('dotenv');

dotenv.config();

module.exports = {
    plugins: [
      new webpack.EnvironmentPlugin({
        'HIVE_URL':null,
        'SEASON_URL':null
      }
    )
    ]
  };