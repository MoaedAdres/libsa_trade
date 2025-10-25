import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import appConfig from './config/app.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ItemsModule } from './modules/items/items.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ConsignmentsModule } from './modules/consignments/consignments.module';
import { ListingsModule } from './modules/listings/listings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DisputesModule } from './modules/disputes/disputes.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { AuditModule } from './modules/audit/audit.module';
import { PhotoRequirementsModule } from './modules/photo-requirements/photo-requirements.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { UserPhonesModule } from './modules/user-phones/user-phones.module';
import { SupplierViolationsModule } from './modules/supplier-violations/supplier-violations.module';
import { DamageAssessmentsModule } from './modules/damage-assessments/damage-assessments.module';
import { ConversationParticipantsModule } from './modules/conversation-participants/conversation-participants.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        throttlers: [{
          ttl: configService.get('app.rateLimit.ttl'),
          limit: configService.get('app.rateLimit.max'),
        }],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FilesModule,
    SuppliersModule,
    ItemsModule,
    BookingsModule,
    ConsignmentsModule,
    ListingsModule,
    PaymentsModule,
    DisputesModule,
    ConversationsModule,
    AuditModule,
    PhotoRequirementsModule,
    AddressesModule,
    UserPhonesModule,
    SupplierViolationsModule,
    DamageAssessmentsModule,
    ConversationParticipantsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
