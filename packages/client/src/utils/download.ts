/*
 * @function
 * Use HTML5 anchor tag's ability to download files
 * by creating a virtual anchor tag element and simulate
 * a click event to trigger the download
 *
 * @param {string} url - URL to download from. The response of this URL should be a file.
 * @param {string} [filename] - Optional. Filename of the file to be downloaded. If no
 * filename is specified, the filename given by backend is used.
 */
export const downloadFile = (url: string, filename?: string) => {
  if (!url) return

  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  a.target = '_blank'
  a.href = url
  if (filename) {
    a.download = filename
  }
  a.click()
  a.remove()
}
