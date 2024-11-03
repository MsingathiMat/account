import  bcryptjs from 'bcryptjs';
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from '@/components/mtt/Api/Prisma/singleton';
import { CreateCookieToken } from '@/components/mtt/Api/CreateCookieToken';
import { ActiveUserType } from '@/components/mtt/Types/MttTypes';


export const POST = async (req:NextRequest) => {
  const data = await req.formData();

  
  const userName = data.get("userName") as string | null;
  const email = data.get("email") as string | null;
  const bio = data.get("bio") as string | null;
  const logo = data.get("logo") as File | null;





  if (!userName || !email || !bio || !logo) {
    return NextResponse.json({ error: "Name, email, password, and image must be supplied" });
  }

  return NextResponse.json({userName,email,bio,logo},{status:200})

  
//   const FileName = image.name;
//   const fileExtension = FileName.split('.').pop();

//   const Imagename = uuid4();
//   const formData = new FormData();

//   formData.append("file", image, `${Imagename}.${fileExtension}`);

//   let filePath = null;
//   try {
//     const response = await axios.post<{file:string}>('https://api.codeddesign.org.za/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Check if the response status is OK
//     if (response.status === 200) {
   
//       filePath = `https://api.codeddesign.org.za/getfile/${Imagename}/${fileExtension}`
//     } else {
//       return NextResponse.json({ error: `Upload failed with status code: ${response.status}` });
//     }
//   } catch (error: any) {
//     // Handle error cases
//     if (error.response) {
//       // Server responded with a status other than 2xx
//       return NextResponse.json({ error: error.response.data || "Upload failed with server error" });
//     } else if (error.request) {
//       // Request was made but no response was received
//       return NextResponse.json({ error: "No response received from the server" });
//     } else {
//       // Something else happened while setting up the request
//       return NextResponse.json({ error: "An error occurred during the request" });
//     }
//   }

// if(!filePath){

//     return NextResponse.json({ error: "No file path",status:500  });
// }


// const UserExist = await SingletonPrisma.user.findUnique({
//     where:{email}
// })
  
// if(UserExist){

//     return NextResponse.json({ error: "user exists",status:500  }); 
// }

// const password = await bcryptjs.hash(UserPassword,10)

// const ExistingUser = await SingletonPrisma.user.create({
// data:{
//     name,
//     email,
//     password,
//     image:filePath
// }

// })

// if(!ExistingUser){

//     return NextResponse.json({message:"User not created", status:500})
// }



  
// const CookieTokenResponse = await CreateCookieToken<ActiveUserType>({

//   activeName:ExistingUser.name as string,
//   activeEmail: ExistingUser.email as string,
//   activeImagePath:ExistingUser.image as string,
//   activeId:ExistingUser.id,
//   activeRole:ExistingUser.role
// })


// return CookieTokenResponse

};

          