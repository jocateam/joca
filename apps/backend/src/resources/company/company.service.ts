import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CreateCompanyCommand } from './commands/create-company.command';
import { InsertResult } from 'typeorm';
import { GetCompanyOrCreateItQuery } from './queries/get-company-or-create-it.query';

@Injectable()
export class CompanyService {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus
  ) {}

  public findOrCreate(company: CreateCompanyDto): Promise<Company> {
    return this._queryBus.execute(
      new GetCompanyOrCreateItQuery(
        company.name,
        company.size ?? '',
        company.domain ?? ''
      )
    );
  }

  public create(createCompanyDto: CreateCompanyDto): Promise<InsertResult> {
    return this._commandBus.execute(
      new CreateCompanyCommand(createCompanyDto.name)
    );
  }
}
