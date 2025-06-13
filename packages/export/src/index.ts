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
</head>
<body>
<textarea id="article" style="display: none;">

${markdown.trim()}

</textarea>
<div id="root"></div>
<style>
${bundle.css}
</style>
<script type="module" crossorigin>
${bundle.js}
</script>
</body>
</html>

  `.trim();
}

// function escapeMarkdown(markdown: string) {
//   return markdown.trim().replace(/\\/g, '\\\\');
// }
