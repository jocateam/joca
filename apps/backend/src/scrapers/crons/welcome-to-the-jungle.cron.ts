import { Cron } from '@nestjs/schedule';

export class WelcomeToTheJungleCron {
  /**
   * Every hour at 10 (1:10, 2:10, ...)
   */
  @Cron('10 0-23/1 * * *')
  hourly() {
    // get the last import date
    // retrieve offers while the import date is not past
    // Insert into the database every 1à offers
    console.log('on cron');
  }
}
