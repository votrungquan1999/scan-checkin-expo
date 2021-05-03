import axios from 'axios';
import { API_KEY } from '../consts/google';
import { SHEET_ID } from '../consts/sheets';
import getAccounts, { UserAccount } from './getAccounts';
import getCurrentLocation from './getCurrentLocation';
import { GetSheetData, SheetInfo } from './getSheetsInfo';

export default async function checkIn(
  accessToken: string,
  barcode: string,
  sheetInfo: SheetInfo,
  checkInUser: UserAccount,
) {
  const currentDate = new Date();
  const date = currentDate.toDateString();

  const time = currentDate.toTimeString();

  const location = await getCurrentLocation();

  const resp = await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate?key=${API_KEY}`,
    {
      requests: [
        {
          appendCells: {
            rows: [
              {
                values: [
                  {
                    userEnteredValue: {
                      stringValue: barcode,
                    },
                  },
                  {
                    userEnteredValue: {
                      stringValue: time,
                    },
                  },
                  {
                    userEnteredValue: {
                      stringValue: date,
                    },
                  },
                  {
                    userEnteredValue: {
                      stringValue: location?.map((location) => {
                        let address = '';
                        if (location.city) {
                          address += location.city + ' ';
                        }

                        if (location.street) {
                          address += location.street;
                        }

                        return address;
                      })[0],
                    },
                  },
                  {
                    userEnteredValue: {
                      stringValue: checkInUser.lastName + ' ' + checkInUser.firstName,
                    },
                  },
                ],
              },
            ],
            fields: '*',
            sheetId: sheetInfo.properties.sheetId,
          },
        },
      ],
    },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return resp.status;
}
