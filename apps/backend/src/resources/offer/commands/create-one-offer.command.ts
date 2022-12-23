import { CreateCompanyDto } from '../../company/dtos/create-company.dto';

export class CreateOneOfferCommand {
  constructor(
    private readonly _title: string,
    private readonly _reference: string,
    private readonly _url: string,
    private readonly _source: string,
    private readonly _company: CreateCompanyDto,
    private readonly _requirements: string,
    private readonly _location: string,
    private readonly _description: string
  ) {}

  get title(): string {
    return this._title;
  }

  get reference(): string {
    return this._reference;
  }

  get url(): string {
    return this._url;
  }

  get source(): string {
    return this._source;
  }

  get company(): CreateCompanyDto {
    return this._company;
  }

  get requirements(): string {
    return this._requirements;
  }

  get location(): string {
    return this._location;
  }

  get description(): string {
    return this._description;
  }
}
