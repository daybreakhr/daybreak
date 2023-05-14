import { fetchAndActivate, getValue } from 'firebase/remote-config'
import { remoteConfig } from './firebase'

export const Flags = {
  emailTemplates: 'email_templates',
  testFlag: 'test_flag',
}

remoteConfig.settings.minimumFetchIntervalMillis = 0
remoteConfig.defaultConfig = {
  [Flags.emailTemplates]: false,
}

await fetchAndActivate(remoteConfig)

export const getFlagValue = (flag: string) => getValue(remoteConfig, flag)
