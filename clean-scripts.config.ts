const tsFiles = `"src/index.d.ts"`
const jsFiles = `"*.config.js"`

export default {
  build: [],
  lint: {
    ts: `eslint --ext .js,.ts ${tsFiles} ${jsFiles}`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`
  },
  test: [],
  fix: `eslint --ext .js,.ts ${tsFiles} ${jsFiles} --fix`
}
