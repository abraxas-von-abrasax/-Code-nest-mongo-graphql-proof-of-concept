import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddBookInput {
    @Field()
    title: string;

    @Field(() => Date, { nullable: true })
    publishingDate?: Date;
}
