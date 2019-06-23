module.exports = {
  extends: [
    "airbnb-base",
  ],
  rules: {
    "max-len": "off",
    quotes: ["error", "double"],
    "object-curly-newline": ["error", { multiline: true, consistent: true }],
    "no-unused-vars": "warn",
    "brace-style": ["error", "stroustrup"],
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "no-shadow": "off"
  },
};
