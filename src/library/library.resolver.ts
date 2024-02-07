import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddBookInput } from './input';
import { LibraryService } from './library.service';
import { Author } from './schemas';

@Resolver(() => Author)
export class LibraryResolver {
    constructor(private authorsService: LibraryService) {}

    @Query(() => [Author])
    async authors(): Promise<Author[]> {
        return this.authorsService.getAuthors();
    }

    @Mutation(() => Author, { name: 'author' })
    async createAuthor(@Args('name') name: string): Promise<Author> {
        return this.authorsService.createAuthor(name);
    }

    @Mutation(() => Author, { name: 'addBook' })
    async addBookToAuthor(@Args('authorId') authorId: string, @Args('addBookData') addBookData: AddBookInput): Promise<Author> {
        return this.authorsService.addBookToAuthor(authorId, addBookData);
    }

    @Mutation(() => Author, { name: 'deleteAuthor' })
    async deleteAuthor(@Args('authorId') authorId: string): Promise<Author> {
        return this.authorsService.deleteAuthor(authorId);
    }
}
