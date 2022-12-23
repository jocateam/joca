import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCompanyCommand } from './create-company.command';
import { InsertResult, Repository } from 'typeorm';
import { Company } from '../company.entity';
import { Inject } from '@nestjs/common';
import { COMPANY_REPOSITORY } from '../../../shared/constants';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyCommandHandler
  implements ICommandHandler<CreateCompanyCommand, InsertResult>
{
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly _repository: Repository<Company>
  ) {}

  execute(command: CreateCompanyCommand): Promise<InsertResult> {
    const company = this._repository.create({
      name: command.name,
    });
    return this._repository.insert(company);
  }
}
