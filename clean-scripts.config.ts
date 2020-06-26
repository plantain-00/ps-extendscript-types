const tsFiles = `"src/index.d.ts"`

export default {
  build: [],
  lint: {
    ts: `eslint --ext .js,.ts ${tsFiles}`,
    markdown: `markdownlint README.md`
  },
  test: [],
  fix: `eslint --ext .js,.ts ${tsFiles} --fix`
}
