import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFollowerDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    userid: number;
}
