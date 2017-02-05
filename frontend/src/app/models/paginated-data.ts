/**
 * @link http://docs.spring.io/autorepo/docs/spring-data-commons/1.6.1.RELEASE/api/org/springframework/data/domain/Page.html
 */
export class PaginatedData {
  Type: any;
  items: Array<any>;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: string;
  totalElements: number;
  totalPages: number;

  constructor (config: any, Type: any) {
    const mapping = config || {};

    // Content
    this.Type = Type;
    this.items = [];
    if (mapping.content) {
      for (let item of mapping.content) {
        this.items = this.items.concat(new this.Type(item));
      }
    }

    // Meta - Current Response
    this.first = mapping.first;
    this.last = mapping.last;
    this.number = mapping.number;
    this.numberOfElements = mapping.numberOfElements;
    this.size = mapping.size;

    // Meta - Total
    this.sort = mapping.sort;
    this.totalElements = mapping.totalElements;
    this.totalPages = mapping.totalPages;
  }
}
