import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

/**
 * Turn HttpService <Observable<Response<data>> into Promise<data>
 */
@Injectable()
export class PromisifyHttpService {
  constructor(
    private httpService: HttpService,
  ){}

  get(url: string): Promise<any> {
    return this.httpService.get(url)
      .pipe(map(res => res.data))
      .toPromise();
  }

}
