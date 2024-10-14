// TODO
type FrontMatter = {
  docTitle: string;
};

type RuntimeBundle = {
  css: string;
  js: string;
  font: string;
};

export async function createRuntimeHtml(
  markdown: string,
  frontmatter: FrontMatter,
  bundle: RuntimeBundle,
) {
  return `

<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${frontmatter.docTitle}</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
<!--
<script
  async
  src="https://cdn.jsdelivr.net/npm/mathjax-${bundle.font}-font@4.0.0-beta.7/tex-mml-chtml-mathjax-${bundle.font}.js">
</script>
-->
</head>
<body>
<textarea id="article" style="display: none;">

${markdown.trim()}

</textarea>
<div id="root"></div>
<style>
${bundle.css}
</style>
<script>
${bundle.js}
</script>
</body>
</html>

  `.trim();
}

// function escapeMarkdown(markdown: string) {
//   return markdown.trim().replace(/\\/g, '\\\\');
// }
