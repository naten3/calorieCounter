import { URLSearchParams } from '@angular/http'

export class DateUtils {

  public static UTCFromLocalTimeString(s: string) {
    let d = new Date(s);
    let result = new Date( d.getTime() + ( d.getTimezoneOffset() * 60000 ) );
    return result;
  }

  public static getDateStringForFormInit(d: Date) {
    return new Date( d.getTime() - ( d.getTimezoneOffset() * 60000 ))
    .toISOString().slice(0,19);
  }
}
