import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class InquireDTO{
    @IsString()
    @IsNotEmpty()
    message:string
}

interface Inquire {
    id: number,
    message: string,
    home_id: number,
    buyer_id: number,
    realtor_id: number
}

export class InquireResponse{
    constructor (partial:Inquire){
        Object.assign(this,partial)
    }

    @Exclude()
    home_id:number;

    @Expose({name:"homeId"})
    homeId(){
        return this.home_id;
    }

    @Exclude()
    buyer_id:number;

    @Expose({name:"buyerId"})
    buyerId(){
        return this.buyer_id;
    }

    @Exclude()
    realtor_id:number;

    @Expose({name:"realtorId"})
    realtorId(){
        return this.realtor_id;
    }
}