import axios from 'axios';
import { API_KEY } from '../consts/google';
import { SHEET_ID } from '../consts/sheets';

export interface GetSheetData {
  sheets: SheetInfo[];
}

export interface SheetInfo {
  properties: SheetProperties;
  data: SheetData[];
}

export interface SheetProperties {
  sheetId: number;
  title: string;
  index: number;
  sheetType: string;
  gridProperties: GridProperties;
}

export interface GridProperties {
  rowCount: number;
  columnCount: number;
}

export interface SheetData {
  rowData: RowData[];
}

export interface RowData {
  values: CellData[];
}

export interface CellData {
  userEnteredValue: {
    stringValue: string;
  };
  effectiveValue: {
    stringValue: string;
  };
  formattedValue: string;
}

export async function getSheetData(accessToken: string) {
  // https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}

  try {
    const resp = await axios.get<GetSheetData>(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?includeGridData=true&key=${API_KEY}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return resp.data;

    // console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
}
