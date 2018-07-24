module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "no-console": 0,
      "global-require": 0,
      "arrow-body-style": 0,
      "comma-dangle": 0,
      "no-underscore-dangle": 0,
      "function-paren-newline": ["error", "consistent"],
      "object-curly-newline": ["error", {
        "ObjectExpression": { "minProperties": 5, "multiline": true, "consistent": true },
        "ObjectPattern": { "minProperties": 5, "multiline": true, "consistent": true },
        "ImportDeclaration": { "minProperties": 5, "multiline": true, "consistent": true },
        "ExportDeclaration": { "minProperties": 5, "multiline": true, "consistent": true }
      }]
    }
};
