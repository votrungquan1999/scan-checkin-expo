import checkIn from './checkIn';
import { GetSheetData, getSheetData } from './getSheetsInfo';
import { setSheetProperties } from './setSheetProperties';

function getSheetID(sheetData: GetSheetData, name: string) {
  let sheetID: number = 0;

  sheetData.sheets.forEach((sheet) => {
    if (sheet.properties.title === name) {
      sheetID = sheet.properties.sheetId;
    }
  });

  return sheetID;
}

function getSheetInfo(sheetData: GetSheetData, name: string) {
  const [sheetInfo] = sheetData.sheets.filter((data) => {
    console.log(data.properties);
    return data.properties.title === name;
  });

  return sheetInfo;
}

export default async function processScannedValue(accessToken: string, value: string) {
  const sheetData = await getSheetData(accessToken);

  if (!sheetData) {
    alert('get google sheet data error');
    return;
  }

  const sheetID = getSheetID(sheetData, 'check-in');

  const sheetInfo = getSheetInfo(sheetData, 'check-in');
  if (!sheetInfo) {
    alert('can not find sheet name check-in, please create one!');
    return;
  }

  await setSheetProperties(sheetInfo, accessToken);

  await checkIn(accessToken, sheetID, value, sheetInfo);
}
