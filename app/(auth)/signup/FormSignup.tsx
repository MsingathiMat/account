    
    "use client";

    import React from "react";
    import MttForm, {
    
      MttSubmit,
      MttTextArea,
      MttTextField,
  
    } from "@/components/mtt/components/mttForm/mttForm";
    
    import { SubmitHandler, useForm } from "react-hook-form";
    import z from "zod";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { useMutation } from "@tanstack/react-query";
    import withUtilities from "@/components/mtt/HOC/withUtilities";
    import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import MttArrowText from "@/components/mtt/components/MttArrowText";
    
    const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
      // Declare FORM NAME or Table name
      const FormName = "User";
    
      // Get(Destructure) all the methods that your form will need from  Utilities
      const {
        Create,
        toast,
        MttImageFile,
        MttImageDisplay,
        ImageReset,
        ObjectToFormData,
        IsLoading,
        QClient,
      } = Utilities;
    
      // Create a FormSchema
      const FormSchema = z.object({
        userName: z.string().min(1, "Required"),
        email: z.string().email({ message: "Not VAlid" }),
        bio: z.string().min(1, "Required"),
        logo: z.instanceof(File, { message: "Required" }),
     
      });
    
      // Form Type
      type FormType = z.infer<typeof FormSchema>;
    
      // FormMethods
      const FormMethods = useForm<FormType>({
        defaultValues: {
          userName: "",
          bio: "",
          email: "",
          logo: undefined,
          
        },
        resolver: zodResolver(FormSchema),
        mode: "all",
      });
    
      //Form Submit Method
      const FormSubmit: SubmitHandler<FormType> = (data) => {
        const ConvertedFormData = ObjectToFormData(data);
        FormMutation.mutate({ formData: ConvertedFormData });
      };
    
      const FormMutation = useMutation({
        mutationKey: ["mtUsers"],
        mutationFn: async ({ formData }: { formData: FormData }) => {
          //Create has been supplied by HOC. It comes from MttFetch
          return await Create("/api/auth/signup", formData);
        },
        onError: () => {
          //toast has been supplied by HOC. It comes from Shadcn
          toast({
            title: "ERROR",
            description: `Failed to create ${FormName}`,
          });
        },
        onSuccess: () => {
          //QClient has been supplied by HOC. It comes from Shadcn
          QClient.invalidateQueries({ queryKey: ["getUsers"] });
    
          //Reset form fields
          // FormMethods.reset();
    
          // Resert MttImage - This clears input images on the UI
          ImageReset("imageUrl");
    
          //toast has been supplied by HOC. It comes from Shadcn
          toast({
            title: "SUCCESS",
            description: `${FormName} created successfully`,
          });
        },
      });
    
      // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING
    
      const readOnly = FormMutation.isPending;
      const FormIsloading = FormMutation.isPending;
    
      return (
        <div className=" mtt-Alpha p-4 w-fit rounded-md">
         
            <MttForm
              title="Register"
            debugMode
              indicator
              onSubmit={FormSubmit}
              Methods={FormMethods}
              className="  mtt-center gap-6 mt-2 !flex-col w-fit "
            >
              <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
                <div className=" mtt-center gap-4 !flex-col">
                  <MttTextField
                    readOnly={readOnly}
                    Icon="user"
                    name="userName"
                    label="User Name"
                    className=""
                  />
                  <MttTextField
                    readOnly={readOnly}
                    Icon="email"
                    name="email"
                    label="User Name"
                    className=""
                  />
               
                  <MttTextArea
                    readOnly={readOnly}
                    name="bio"
                    label="Your Bio"
                    className=""
                  />
                </div>
    
                <div className=" mtt-center gap-4 !flex-col w-[250px]">
                  <MttImageDisplay name="logo" className=" w-[250px]" />
              
             
                  <MttImageFile
                    readOnly={readOnly}
                    name="logo"
                    label="Company logo"
                  />
               
    
                  <IsLoading
                    className="w-full mtt-center"
                    isLoading={FormIsloading}
                  >
                    <MttSubmit>Submit</MttSubmit>
                  </IsLoading>
                 
                </div>

              </div>

              <MttArrowText link="/signin" title="Sign In" />
            </MttForm>
       
        </div>
      );
    };
    
    const FormSignup = withUtilities(OriginalForm);
    export default FormSignup;
    
        