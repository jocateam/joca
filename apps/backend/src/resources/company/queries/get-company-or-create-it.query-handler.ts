import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCompanyOrCreateItQuery } from './get-company-or-create-it.query';
import { Company } from '../company.entity';
import { CompanyService } from '../company.service';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { COMPANY_REPOSITORY } from '../../../shared/constants';

@QueryHandler(GetCompanyOrCreateItQuery)
export class GetCompanyOrCreateItQueryHandler
  implements IQueryHandler<GetCompanyOrCreateItQuery, Company>
{
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly _repository: Repository<Company>,
    private readonly _companyService: CompanyService
  ) {}

  async execute(query: GetCompanyOrCreateItQuery): Promise<Company> {
    const company = await this._repository.findOneBy({ name: query.name });
    if (company) {
      return company;
    }

    return await this._companyService
      .create({ name: query.name, domain: query.domain })
      .then((c) => {
        console.log(c);
        return this._repository.create({ id: Number(c.identifiers[0]) });
      });
  }
}
