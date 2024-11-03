"use client";

import React from "react";
import MttForm, {
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";

import { SubmitHandler, useForm } from "react-hook-form";
import z, { custom } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import MttArrowText from "@/components/mtt/components/MttArrowText";

const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  // Declare FORM NAME or Table name
  const FormName = "Login";

  // Get(Destructure) all the methods that your form will need from  Utilities
  const { Create, toast, ImageReset, IsLoading, QClient } = Utilities;

  // Create a FormSchema
  const FormSchema = z
    .object({
      email: z.string().email({ message: "Not VAlid" }),
      password: z.string().min(1, "Required"),
      passwordConfirm: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
          code: "custom",
          path: ["passwordConfirm"],
          message: "Password Match",
        });
      }
    });

  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(FormSchema),
    mode: "all",
  });

  //Form Submit Method
  const FormSubmit: SubmitHandler<FormType> = (data) => {
  
    FormMutation.mutate(data);
  };

  const FormMutation = useMutation({
    mutationKey: ["mtUsers"],
    mutationFn: async ( data:FormType ) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create("/api/auth/signin", data);
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

      // Reset MttImage - This clears input images on the UI
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
    <div className=" mtt-Alpha1 p-4 w-fit rounded-md ">
     
        <MttForm
          title="Login"
          indicator
          onSubmit={FormSubmit}
          Methods={FormMethods}
          className="  mtt-center gap-6 mt-2 !flex-col w-fit  "
        >
          <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
            <div className=" mtt-center gap-4 !flex-col">
              <MttTextField
                readOnly={readOnly}
                Icon="email"
                name="email"
                label="User Name"
                className=""
              />

              <MttTextField
                readOnly={readOnly}
                Icon="lock"
                type="password"
                name="password"
                label="Password"
                className=""
              />

              <MttTextField
                readOnly={readOnly}
                Icon="lock"
                type="password"
                name="passwordConfirm"
                label="Confirm Password"
                className=""
              />

              <IsLoading
                className="w-full mtt-center mt-5"
                isLoading={FormIsloading}
              >
                <MttSubmit>Login</MttSubmit>
              </IsLoading>

              <MttArrowText link="/signup" title="Signup" />
            </div>
          </div>
        </MttForm>
   
    </div>
  );
};

const FormSignin = withUtilities(OriginalForm);
export default FormSignin;
