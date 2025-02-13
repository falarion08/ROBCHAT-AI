export interface RegisterError {
        firstName?: string[] | undefined;
        lastName?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
        confirm?:string[] | undefined;
} 

export interface User {
        id: string,
        firstName:string,
        lastName:string,
        email:string,
        password:string, 
        isVerified:boolean, 
        verifyToken:string | null,
        verifyTokenExpire: number | null,
}