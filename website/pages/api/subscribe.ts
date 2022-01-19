import moment from 'moment-timezone'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'

type Data = {
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email } = req.body

  await addToBetaList(email)

  res.status(200).json({
    email
  })
}

async function addToBetaList(email: string) {
  const doc = new GoogleSpreadsheet(<string>process.env.GOOGLE_SPREADSHEET_ID)
  const auth = {
    client_email: <string>process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: <string>process.env.GOOGLE_PRIVATE_KEY
  }

  await doc.useServiceAccountAuth(auth)

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  await sheet.addRow({
    Email: email,
    Added: moment().tz('America/Chicago').format('LLL'),
    ISO8601: moment().toISOString()
  })
}
