// @ts-check
import eslint from '@antfu/eslint-config'

export default eslint(
  {
    test: false,
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)