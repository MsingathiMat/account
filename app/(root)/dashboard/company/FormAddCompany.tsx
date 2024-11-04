"use client";

import React, { useEffect, useState } from "react";
import MttForm, {
  MtComboSearch,
  MttSelect,
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";

import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { ActiveUserType, UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import useActiveUser from "@/components/mtt/Hooks/useActiveUser";
import { MutationModels, QueryModels } from "@/components/mtt/config/RQconfig";
import { Prisma } from "@prisma/client";
import { MttSearchCombo } from "@/components/mtt/components/mttSearchCombo";


const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
 
const [SelectValues, SetSelectValues] = useState([{}])

  // Declare FORM NAME or Table name
  const FormName = "User";

  //Current User ID

  const { userData } = useActiveUser<ActiveUserType>();
  // Get(Destructure) all the methods that your form will need from  Utilities

  useEffect(() => {
    if (userData?.activeId) {
      FormMethods.setValue("UserId", userData.activeId);
    }
  }, [userData]);
  const {
    Create,
    Read,
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
    UserId: z.string().min(1, "Required"),
    CompanyName: z.string().min(1, "Required"),
    ContactPerson: z.string().min(1, "Required"),
    Type: z.enum(["Company", "Individual"]),
    ContactNo: z.string().min(1, "Required"),
    TagLine: z.string().min(1, "Required"),
    Email: z.string().email({ message: "Not Valid" }),
    Logo: z.instanceof(File, { message: "Required" }),
  });

  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      CompanyName: "",
      ContactPerson: "",
      Type: undefined,
      ContactNo: "",
      Email: "",
      TagLine: "",
      Logo: undefined,
    },
    resolver: zodResolver(FormSchema),
    mode: "all",
  });

  //Form Submit Method
  const FormSubmit: SubmitHandler<FormType> = (data) => {
    const ConvertedFormData = ObjectToFormData(data);
    FormMutation.mutate({ formData: ConvertedFormData });
  };


const FormQuery = useQuery({
  queryKey:[QueryModels.Companies.QueryKey],
  queryFn:async()=>{

    return await Read<Prisma.CompaniesCreateInput[]>('/api/root/dashboard/FormAddCompany/getFormData')

  }
})

const {data, isPending:SlelectValuePending} = FormQuery

console.log(data)
useEffect(()=>{


  if(data){

 
    data.map((CompanyData)=>{
  
    
        SetSelectValues([...SelectValues,{value:CompanyData.CompanyName,label:CompanyData.CompanyName,id:CompanyData.CompanyId}])

    })
  
  }
},[data])

  const FormMutation = useMutation({
    mutationKey:[MutationModels.Companies.MutationKey],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create("/api/root/dashboard/FormAddCompany/", formData);
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
      QClient.invalidateQueries({ queryKey: MutationModels.Companies.Dependants });

      //Reset form fields
      FormMethods.reset();

      // Resert MttImage - This clears input images on the UI
      ImageReset("Logo");

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

    <div>

<IsLoading isLoading={SlelectValuePending}>
        <MttSearchCombo
        
        returnAValue
        Onselect={(val=>alert(val))}
          placeholder="Choose Company"
          SelectValues={
            SelectValues as { value: string; label: string; id: string }[]
          }
          className="w-[250px]"
        />
        </IsLoading>

        <div className=" mtt-Alpha p-4 w-fit rounded-md">
      
      <MttForm
        onSubmit={FormSubmit}
        Methods={FormMethods}
        className="  mtt-center gap-6 mt-2 !flex-col w-fit "
      >
        


        <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
          <div className=" mtt-center gap-4 !flex-col">
            <MttTextField
              readOnly={readOnly}
              name="CompanyName"
              label="Company Name"
              className=""
            />
            <MttSelect
              readOnly={readOnly}
              name="Type"
              label="Select Type"
              Options={[
                { value: "Company", label: "Company" },
                { value: "Individual", label: "Individual" },
              ]}
            />
            <MttTextField
              readOnly={readOnly}
              name="ContactPerson"
              label="Contact Person"
              className=""
            />
          </div>

          <div className=" mtt-center gap-4 !flex-col">
            <MttTextField
              readOnly={readOnly}
              name="TagLine"
              label="Tagline"
              className=""
            />
            <MttTextField
              readOnly={readOnly}
              name="ContactNo"
              label="Contact Number"
              className=""
            />

            <MttTextField
              readOnly={readOnly}
              name="Email"
              label="Company Email"
              className=""
            />
          </div>

          <div className=" mtt-center gap-4 !flex-col w-[250px]">
            <MttImageDisplay name="Logo" className=" h-[130px] " />
            <MttImageFile name="Logo" label="Company Logo" />
          </div>
        </div>
        <IsLoading className="w-full mtt-center" isLoading={FormIsloading}>
          <MttSubmit>Add</MttSubmit>
        </IsLoading>
      </MttForm>
    </div>
    </div>
   
  );
};

const FormAddClient = withUtilities(OriginalForm);
export default FormAddClient;