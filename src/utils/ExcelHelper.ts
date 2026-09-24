import XLSX from 'xlsx';

export class ExcelHelper {

    static readExcel(filePath: string, sheetName: string): Record<string, string>[] {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        //converting sheet to json as no need to maintain nested loop
        //defval = "" - ignore the blank value inside excel sheet
        return XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
    }

}