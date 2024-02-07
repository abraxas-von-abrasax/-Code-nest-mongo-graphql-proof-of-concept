import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { LibraryModule } from './library/library.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: configService => ({
                uri: configService.get('mongodb.uri'),
                auth: {
                    username: configService.get('mongodb.username'),
                    password: configService.get('mongodb.password'),
                },
            }),
        }),
        GraphQLModule.forRootAsync({
            driver: ApolloDriver,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: configService => ({
                playground: configService.get('graphql.playground'),
                autoSchemaFile: configService.get('graphql.autoSchemaFile'),
                sortSchema: configService.get('graphql.sortSchema'),
            }),
        }),
        LibraryModule,
    ],
})
export class AppModule {}
