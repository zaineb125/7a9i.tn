import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';
import { AuthLawyerService } from './auth-lawyer.service';
import { Body, Controller, Post,UseGuards,Res, Get, Req, Param, UseInterceptors, UploadedFile} from "@nestjs/common";
import { Response ,Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import { Double } from 'typeorm';

const editFileName = (req, file, cb) => {
  const randomName = uuidv4()+file.originalname;
  cb(null, randomName);
}
@Controller('auth-lawyer')
export class AuthLawyerController {
    constructor(private authLawyerService:AuthLawyerService){}

   
    @Post("signin")
    async signIn(@Body() dto:authLawyerSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authLawyerService.signInLawyer(dto)
  
        return {token:token}
  
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
    console.log("1")
    const response = {
    originalname: file.originalname,
    filename: file.filename,
    };
    console.log("2")
    console.log(response.filename);
    return this.authLawyerService.updatePicture(jwt,response.filename);
   
    } 

    @Get('/:imgpath')
    seeUploadedFile(@Param('imgpath') image,@Res() res) {
      return res.sendFile(image, { root: './files' });
    }

    @Get("lawyerInfo/:jwt")
    async getlawyerInfo(@Param("jwt")jwt:any){
      const lawyerInfo= this.authLawyerService.findLawyerByJwt(jwt);
      const lawyer = await lawyerInfo;
      return {
        "firstName": lawyer.name,
        "familyName": lawyer.FamilyName,
        "age": lawyer.age,
        "adress": lawyer.city,
        "email": lawyer.email,
        "speciality":lawyer.speciality,
        "description":lawyer.description,
        "image":lawyer.image,
        "phoneNumber":lawyer.phoneNumber,
        "rating":lawyer.rating,
      };
    }

    @Post("lawyers")
    async getlawyers(@Param("jwt")jwt:any){
      const lawyerInfo= this.authLawyerService.getLawyers();
      const lawyers = await lawyerInfo;
      const result = lawyers.map(lawyer => {
        return(
        {"firstName": lawyer.name,
        "familyName": lawyer.FamilyName,
        "age": lawyer.age,
        "adress": lawyer.city,
        "email": lawyer.email,
        "speciality":lawyer.speciality,
        "description":lawyer.description,
        "image":lawyer.image,
        "phoneNumber":lawyer.phoneNumber,
        "rating":lawyer.rating,})
      });
      return result ;
    }

    @Get('signout')
    async logout(@Req()req:Request,@Res({ passthrough: true }) res: Response) {
      
      const token =req.cookies.access_token;
       
      this.authLawyerService.signoutLawyer(token);
     
      res.cookie('access_token', '', { expires: new Date() });
   
    }
    

    @Post("signup")
    async signUp(@Body() dto:authLawyerSignUpDto,@Res({ passthrough: true }) response: Response){
        const token =await this.authLawyerService.signUpLawyer(dto) 
       
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true }); 
    }

    @Get('lawyerInfoByEmail/:email')
    async getLawyerByEmail(@Param('email') email: any) {
      
      const lawyer = await this.authLawyerService.findLawyerByEmail(email);
      if (lawyer) {
        return lawyer;
      }
    }
    @Post("updateRating/:email/:rating")
    async updateRating(@Param("email") email:string , @Param("rating") rating:number){

      return await this.authLawyerService.updateRating(email,rating);

    }
}


