import axios from 'axios';
import { API_KEY } from '../consts/google';
import { SHEET_ID } from '../consts/sheets';
import { GetSheetData, SheetInfo } from './getSheetsInfo';

export default async function checkIn(accessToken: string, sheetID: number, customer: string, sheetInfo: SheetInfo) {
  const currentDate = new Date();
  const timestamp = currentDate.toDateString();

  const time = currentDate.toTimeString();

  let row: number = 0,
    column: number = 0;
  sheetInfo.data.forEach((info) => {
    info.rowData.forEach((rowData, index) => {
      if (rowData.values[0].effectiveValue.stringValue === customer) {
        row = index;
        column = rowData.values.length;
      }
    });
  });

  console.log(sheetInfo, row, column);

  if (row === 0) {
    alert('can not find user name');
    return;
  }

  const resp = await axios.post(
    ` https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate?key=${API_KEY}`,
    {
      requests: [
        {
          updateCells: {
            rows: [
              {
                values: [
                  {
                    userEnteredValue: {
                      stringValue: timestamp + ' ' + time,
                    },
                  },
                ],
              },
            ],
            fields: '*',
            start: {
              sheetId: sheetID,
              columnIndex: column,
              rowIndex: row,
            },
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
}
