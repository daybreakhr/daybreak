type InstalledTypes = {
  isGmailInstalled?: boolean
  isSlackInstalled?: boolean
  isGCalInstalled?: boolean
}

export default function getAppDetails({
  isGmailInstalled,
  isSlackInstalled,
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
      title: 'Slack',
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
      isInstalled: isSlackInstalled,
    },
    {
      title: 'Gmail',
      imgSrc:
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
      isInstalled: isGmailInstalled,
    },
  ]
}
