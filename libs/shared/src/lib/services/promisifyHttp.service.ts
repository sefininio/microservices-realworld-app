import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map } from 'rxjs/operators';

/**
 * Turn HttpService <Observable<Response<data>> into Promise<data>
 */
@Injectable()
export class PromisifyHttpService {
  constructor(
    private httpService: HttpService,
  ){}

  get(url: string, config: AxiosRequestConfig = null): Promise<any> {
    return this.httpService.get(url, config)
      .toPromise()
      .then(res => res.data);
  }

}
