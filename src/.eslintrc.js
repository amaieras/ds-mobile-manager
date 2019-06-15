module.exports = {
    root: true,
    parserOptions: {
        sourceType: "module",
        parser: "babel-eslint"
    },
    env: {
        browser: true
    },
    extends: ["prettier", "prettier/standard", "plugin:vue/recommended"],
    plugins: ["vue", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "vue/max-attributes-per-line": "off",
        "semi": 0,
        "vue/html-indent": "off",
        "vue/html-self-closing": 0,
        "vue/require-prop-types": 0
    }
};