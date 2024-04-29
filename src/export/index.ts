import cssFile from '../assets/runtime.css?raw';
import jsFile from '../assets/runtime.js?raw';

type FrontMatter = {
  docTitle: string;
};

export async function createRuntimeHtml(
  mdx: string,
  frontmatter: FrontMatter
) {
  console.log('mdx:', mdx);
  return `

<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${frontmatter.docTitle}</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
</head>
<body>

<!--be sure to escape all backslashes: \\ becomes \\\\ -->
<textarea id="article" style="display: none;">

${prepareMdx(mdx)}

</textarea>

<div id="root"></div>
<style>
${cssFile}
</style>
<script>
${jsFile}
</script>
</body>
</html>

  `.trim();
}

function prepareMdx(mdx: string) {
  return mdx.trim().replace(/\\/g, '\\\\');
}
