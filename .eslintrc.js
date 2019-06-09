module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["prettier"],
  extends: ["plugin:vue/essential", "@vue/airbnb", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-underscore-dangle": "off",
    "max-len": [2, 120, 8]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
