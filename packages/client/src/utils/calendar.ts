import { gapi } from 'gapi-script'
import { storage } from 'ui-kit'

const DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: import.meta.env.VITE_API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  })
}

export function gapiLoaded() {
  gapi.load('client', initializeGapiClient)
}

export async function insertEvent(event: gapi.client.calendar.Event) {
  try {
    const response = await gapi.client.calendar.events.insert(
      {
        calendarId: 'primary',
        sendUpdates: 'all', // This flag sends email notification of calendar invite to all attendees
        oauth_token: storage.get('accessToken') ?? '',
      },
      event,
    )
    return response
  } catch (error) {}
}
