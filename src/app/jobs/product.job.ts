import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProductService } from '../modules/product/services/product.service';
import { CRON_EXPRESSION } from './jobs.enums';
import { LoggerService } from '../shared/services/logger.service';

const TOKEN = 'PRODUCT_CRON';

@Injectable()
export class ProductCronJobService {
    private readonly logger: LoggerService;
    constructor(private productService: ProductService) {
        this.logger = new LoggerService(TOKEN);
    }

//   @Cron(CronExpression.EVERY_10_SECONDS)
//   async countProducts() {
//       try {
//           const products = await this.productService.getProducts();
//           this.logger.log('Product count => ', products.length);
//       } catch (err) {
//           this.logger.error('Error : ', err);
//       }
//   }
    
  @Cron(CRON_EXPRESSION.EVERY_5_SECONDS)
  async callMeEverySecond() {
      this.logger.log('I will be executing every 5 second')
  }
}