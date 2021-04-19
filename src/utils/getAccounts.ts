import { GetSheetData, SheetInfo } from './getSheetsInfo';

export interface UserAccount {
  barcode: string;
  lastName: string;
  firstName: string;
}

export default async function getAccounts(sheetData: GetSheetData) {
  const [accountSheet] = sheetData.sheets.filter((sheet) => {
    return sheet.properties.title === 'accounts';
  });

  if (!accountSheet) {
    alert('account tab not found, please create a tab that has accounts');
    return;
  }

  const users: UserAccount[] = accountSheet.data[0].rowData
    .filter((row, index) => index !== 0 && !!row.values[0].effectiveValue)
    .map((row) => {
      // console.log(row.values[0], 'row value 0-------------');
      console.log(row.values[0], '--------');
      const newUser: UserAccount = {
        barcode: row.values[0] && row.values[0].formattedValue,
        lastName: row.values[1] && row.values[1].effectiveValue?.stringValue,
        firstName: row.values[2] && row.values[2].effectiveValue?.stringValue,
      };

      // console.log(newUser);

      return newUser;
    });

  if (!users) {
    alert('no user exist in sheet');
  }

  return users;
}
