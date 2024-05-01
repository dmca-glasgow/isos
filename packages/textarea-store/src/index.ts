const textArea = document.getElementById('article') as HTMLTextAreaElement;

export function getTextArea() {
  return textArea;
}

export function getMarkdown() {
  return (textArea.value || '').replace(/\\\\/g, '\\');
}

export function setMarkdown(markdown: string = '') {
  textArea.value = markdown.replace(/\\/g, '\\\\');
  textArea.dispatchEvent(new Event('onchange'));
}
