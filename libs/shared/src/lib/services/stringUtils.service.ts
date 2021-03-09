import { Injectable } from '@nestjs/common';
import slug from 'slug';

@Injectable()
export class StringUtilsService {

  /**
   *
   * @param title article title to slugify
   * @returns the slugified title
   */
  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }

}
