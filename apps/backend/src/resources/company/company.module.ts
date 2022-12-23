import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { companyProviders } from './providers/company.providers';
import { CompanyService } from './company.service';
import { CreateCompanyCommandHandler } from './commands/create-company.command-handler';
import { GetCompanyOrCreateItQueryHandler } from './queries/get-company-or-create-it.query-handler';

const CommandHandlers = [CreateCompanyCommandHandler];
const QueryHandlers = [GetCompanyOrCreateItQueryHandler];

@Module({
  imports: [SharedModule],
  providers: [
    ...CommandHandlers,
    ...companyProviders,
    CompanyService,
    ...QueryHandlers,
  ],
  exports: [
    ...CommandHandlers,
    ...companyProviders,
    CompanyService,
    ...QueryHandlers,
  ],
})
export class CompanyModule {}
