import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Book } from './book.schema';

export type AuthorDocument = HydratedDocument<Author>;

@ObjectType()
@Schema()
export class Author {
    @Field(() => String)
    _id: ObjectId;

    @Field()
    @Prop({ required: true, unique: true })
    name: string;

    @Field(() => [Book])
    @Prop({ type: [Types.ObjectId], ref: 'Book', default: [] })
    books: string[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
