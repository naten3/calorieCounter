import { URLSearchParams } from '@angular/http'

export class HttpUtils {
  public static getPageParams(page: number, pageSize: number) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(pageSize));
    return params;
  }
}
