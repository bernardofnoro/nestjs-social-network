import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFollowingDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    userid: number;
}
