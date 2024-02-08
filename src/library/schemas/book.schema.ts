import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Author } from './author.schema';

export type BookModel = HydratedDocument<Book>;

@ObjectType()
@Schema()
export class Book {
    @Field(() => String)
    _id: Types.ObjectId;

    @Field()
    @Prop({ type: String, required: true, unique: true })
    title: string;

    @Field(() => Author)
    @Prop({ type: Types.ObjectId, ref: 'Author' })
    author: string;

    @Field(() => String)
    @Prop({ type: String, default: '<<no description>>' })
    description: string;

    @Field(() => Date, { nullable: true })
    @Prop(Date)
    publishingDate?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
