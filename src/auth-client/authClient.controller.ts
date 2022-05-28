import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { AuthClientService } from './auth-client.service';
import { Body, Controller, Get, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Response ,Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'

const editFileName = (req, file, cb) => {
  const randomName = uuidv4()+file.originalname;
  cb(null, randomName);
}

@Controller("auth-client")
export class AuthClientController {
    constructor(private authClientService:AuthClientService){}

   
    @Post("signin")
    async signIn(@Body() dto:authClientSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authClientService.signInClient(dto)
      
        return {token : token} ;

    }
   
    @Post('/picture/:jwt')
    @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination: './files',
    filename: editFileName,
    }),
    }))
    uploadFile(
    @Param("jwt")jwt,
    @UploadedFile() file: Express.Multer.File) {
    
    const response = {
    originalname: file.originalname,
    filename: file.filename,
    };
    
    console.log(response.filename);
    return this.authClientService.updatePicture(jwt,response.filename);
   
    
  } 

    @Get('/:imgpath')
    seeUploadedFile(@Param('imgpath') image,@Res() res) {
      return res.sendFile(image, { root: './files' });
    }

    

    @Get("clientInfo/:jwt")
    async getClientInfo(@Param("jwt")jwt:any){
      const clientInfo= this.authClientService.findClientByJWT(jwt);
      const client = await clientInfo;
      return {
        "firstName": client.name,
        "familyName": client.FamilyName,
        "age": client.age,
        "adress": client.city,
        "email": client.email,
        "image":client.image,
      };
    }

    @Get('signout')
    async logout(@Req()req:Request,@Res({ passthrough: true }) res: Response) {
      
      const token =req.cookies.access_token;
      
      this.authClientService.signoutClient(token);
      res.cookie('access_token', '', { expires: new Date() });
   
    }

    @Post("signup")
    async signUp(@Body() dto:authClientSignUpDto,@Res({ passthrough: true }) response: Response){
        const token = await this.authClientService.signUpClient(dto) 
       
        return { token :token};
    }
}