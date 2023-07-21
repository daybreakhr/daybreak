type InstalledTypes = {
  isGmailInstalled?: boolean
  isSlackInstalled?: boolean
  isGCalInstalled?: boolean
}

export default function getAppDetails({
  isGmailInstalled,
  isGCalInstalled,
}: InstalledTypes) {
  return [
    {
      title: 'Google Calendar',
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
      isInstalled: isGCalInstalled,
    },
    {
      title: 'Gmail',
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
      isInstalled: isGmailInstalled,
    },
  ]
}
