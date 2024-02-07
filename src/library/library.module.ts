import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { LibraryResolver } from './library.resolver';
import { LibraryService } from './library.service';
import { AuthorSchema, BookSchema } from './schemas';

const models: ModelDefinition[] = [
    { name: 'Author', schema: AuthorSchema },
    { name: 'Book', schema: BookSchema },
];

@Module({
    imports: [MongooseModule.forFeature(models)],
    providers: [LibraryService, LibraryResolver],
})
export class LibraryModule {}
