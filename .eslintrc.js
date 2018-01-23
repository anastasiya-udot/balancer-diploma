module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
      "semi": [ "error", "always" ],
      "quotes": [ "error", "single" ],
      "no-unused-vars": [ "error", { "vars": "all", "args": "none" }],
      "indent": [
        "error",
        "tab",
        { "SwitchCase": 1 }
      ],
      "no-console": "warn",
      "no-redeclare": "error",
      "no-empty": "error",
      "space-before-function-paren": [ "error", "never" ],
      "space-in-parens": [ "error", "never" ],
      "keyword-spacing": "error",
      "arrow-spacing": "error",
      "object-curly-spacing": [ "error", "always" ],
      "array-bracket-spacing": [ "error", "never" ],
      "space-unary-ops": [
        "error",
        {
          "words": true,
          "nonwords": false,
          "overrides": {
            "new": false,
            "++": false
          }
        }
      ],
      "brace-style": [
        "error",
        "1tbs",
        { "allowSingleLine": true }
      ],
      "no-multi-spaces": "error",
      "key-spacing": [
        "error",
        {
          "beforeColon": false,
          "afterColon": true
        }
      ],
      "comma-spacing": [
        "error",
        {
          "before": false,
          "after": true
        }
      ],
      "computed-property-spacing": [ "error", "never" ],
      "block-spacing": "error",
      "func-call-spacing": ["error", "never"],
      "comma-style": [ "error", "last" ],
      "comma-dangle": [ "error" ],
      "consistent-this": [ "error", "_this" ],
      "no-array-constructor": "error",
      "no-new-object": "error",
      "no-restricted-syntax": [ "error", "WithStatement" ],
      "no-spaced-func": "error",
      "no-whitespace-before-property": "error",
      "semi-spacing": "error",
      "no-trailing-spaces":  "error",
      "space-before-blocks": "error",
      "no-use-before-define": [
        "error",
        {
          "functions": false
        }
      ],
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty-character-class": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-func-assign": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-negated-in-lhs": "error",
      "no-obj-calls": "error",
      "no-regex-spaces": "error",
      "no-sparse-arrays": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "use-isnan": "error",
      "valid-jsdoc": "error",
      "valid-typeof": "error",
      "vars-on-top": "error",
      "one-var": [
        "error",
        {
          "var": "never",
          "const": "never"
        }
      ],
      "newline-after-var": [
        "error",
        "always"
      ],
      "one-var-declaration-per-line": [
        "error",
        "always"
      ],
      "space-infix-ops": "error",
      "require-path-exists/notEmpty": "error",
      "require-path-exists/exists": "error",
      "array-callback-return": "error",
      "block-scoped-var": "error",
      "curly": [ "error", "multi-line" ],
      "dot-location": [ "error", "property" ],
      "no-alert": "error",
      "no-caller": "error",
      "no-div-regex": "error",
      "no-extra-bind": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-proto": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": [
        "error",
        {
          "allowTernary": true,
          "allowShortCircuit": true
        }
      ],
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-void": "error",
      "no-warning-comments": "warn",
      "no-with": "error",
      "radix": "error",
      "yoda": "error",
      "no-catch-shadow": "error",
      "no-new-require": "error",
      "func-name-matching": "error",
      "lines-around-directive": [
        "error",
        {
          "before": "never",
          "after": "always"
        }
      ],
      "max-depth": [ "error", 4 ],
      "no-mixed-spaces-and-tabs": "error",
      "no-multiple-empty-lines": "error",
      "no-unneeded-ternary": "error",
      "operator-linebreak": [
        "error",
        "after",
        {
          "overrides": { "|": "before", "&": "before" } 
        }
      ],
      "no-duplicate-imports": "error",
      "no-useless-computed-key": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "yield-star-spacing": [ "error", "after" ],
      "callback-return": [ "error", ["next", "callback", "cb", "res.send"] ],
      "no-cond-assign": ["error", "always"]
    },
    "plugins": [ 
      "require-path-exists"
    ]
};