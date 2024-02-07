import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { performance } from 'perf_hooks';
import { AddBookInput } from './input';
import { Book } from './schemas';
import { Author } from './schemas/author.schema';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Author.name) private readonly authorModel: Model<Author>,
        @InjectModel(Book.name) private readonly bookModel: Model<Book>
    ) {}

    async getAuthors(): Promise<Author[]> {
        return this.authorModel.find().populate('books').exec();
    }

    async createAuthor(name: string): Promise<Author> {
        const stored = await this.authorModel.findOne({ name });

        if (stored) {
            return stored;
        }

        const author = new this.authorModel({ name });
        return author.save();
    }

    async addBookToAuthor(authorId: string, addBookData: AddBookInput): Promise<Author> {
        const start = performance.now();
        const author = await this.getAuthor(authorId);

        if (!author) {
            throw new NotFoundException(`Author #${authorId} not found`);
        }

        const book = await this.bookModel.findOne({ title: addBookData.title, author: authorId });

        if (book) {
            const end = performance.now();
            Logger.log(`addBookToAuthor ${end - start}ms`);
            return this.authorModel.findById(authorId).populate('books').exec();
        }

        const savedBook = await this.bookModel.create({ ...addBookData, author: authorId });

        const doc = new this.authorModel(author);
        doc.books.push(savedBook._id as unknown as string);

        const res = await doc.save().then(res => res.populate('books'));
        const end = performance.now();
        Logger.log(`addBookToAuthor ${end - start}ms`);
        return res;
    }

    async deleteAuthor(authorId: string): Promise<Author> {
        const author = await this.authorModel.findById(authorId).populate('books').exec();

        if (!author) {
            throw new NotFoundException(`Author #${authorId} not found`);
        }

        await this.authorModel.deleteOne({ _id: authorId }).exec();
        await this.bookModel.deleteMany({ author: authorId }).exec();
        return author;
    }

    private async getAuthor(authorId: string): Promise<Author | null> {
        const author = await this.authorModel.findById(authorId).exec();

        if (!author) {
            return null;
        }

        return author;
    }
}
