import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/health')
    public getHealth(): {} {
        return { message: 'Health OK!' };
    }

    @Get()
    public getAppStatus(): {} {
        return { message: 'app is up and running!' };
    }
}
