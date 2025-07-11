import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { ExampleModule } from './modules/example/example/example.module';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Tạm thời bỏ kết nối database
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT, 10) || 5432,
    //   username: process.env.DB_USERNAME || 'postgres',
    //   password: process.env.DB_PASSWORD || 'postgres',
    //   database: process.env.DB_DATABASE || 'test',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
