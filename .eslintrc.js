module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "no-console": 0,
      "global-require": 0,
      "arrow-body-style": 0,
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
      "comma-dangle": 0,
      "no-underscore-dangle": 0,
    }
};
