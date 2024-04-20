export class ApiResponse{

    public responseData:any;
    
    constructor(public message:string, public StatusCode: number,data:any){
    
        this.responseData=data;
    }
    
    }