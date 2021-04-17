import axios from 'axios';
import { API_KEY } from '../consts/google';
import { SHEET_ID } from '../consts/sheets';
import { SheetInfo } from './getSheetsInfo';

export async function setSheetProperties(sheetInfo: SheetInfo, accessToken: string) {
  const sheetProps = sheetInfo.properties;

  sheetProps.gridProperties.columnCount = 1000;

  try {
    const resp = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate?key=${API_KEY}`,
      {
        requests: [
          {
            updateSheetProperties: {
              properties: {
                ...sheetProps,
              },
              fields: '*',
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

    // console.log(resp.data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
