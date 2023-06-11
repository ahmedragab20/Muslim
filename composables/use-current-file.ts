import path from 'path';

export default function () {
  const currentUrl = new URL(import.meta.url);
  const currentFilePath = currentUrl.pathname;
  const currentFileName = path.basename(currentFilePath);
  const currentFileExtension = path.extname(currentFilePath);
  const currentDirectoryName = path.dirname(currentFilePath);

  return {
    path: currentFilePath,
    name: currentFileName,
    extension: currentFileExtension,
    directory: currentDirectoryName,
    url: currentUrl,
  };
}
