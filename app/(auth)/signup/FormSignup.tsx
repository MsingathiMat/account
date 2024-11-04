"use client";

import React from "react";
import MttForm, {
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";

import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import MttArrowText from "@/components/mtt/components/MttArrowText";
import { MttRedirect } from "@/components/mtt/Helpers/MttRedirect";

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
  const FormSchema = z
    .object({
      name: z.string().min(1, "Required"),
      email: z.string().email({ message: "Not Valid" }),
      password: z.string().min(1, "Required"),
      passConfirm: z.string().min(1, "Required"),
      ProfileImage: z.instanceof(File, { message: "Required" }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passConfirm) {
        ctx.addIssue({
          code: "custom",
          path: ["passConfirm"],
          message: "Password Match",
        });
      }
    });

  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passConfirm: "",
      ProfileImage: undefined,
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

      // Reset form fields
      FormMethods.reset();

      // Resert MttImage - This clears input images on the UI
      ImageReset("imageUrl");

      //toast has been supplied by HOC. It comes from Shadcn
      toast({
        title: "SUCCESS",
        description: `${FormName} created successfully`,
      });

      MttRedirect("/dashboard");
    },
  });

  // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING

  const readOnly = FormMutation.isPending;
  const FormIsloading = FormMutation.isPending;

  return (
    <div className=" mtt-Alpha p-4 w-fit rounded-md">
      <MttForm
        title="Register"
        indicator
        onSubmit={FormSubmit}
        Methods={FormMethods}
        className="  mtt-center gap-6 mt-2 !flex-col w-fit "
      >
        <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
          <div className=" mtt-center gap-4 !flex-col">
            <MttTextField
              readOnly={readOnly}
              type="textInput"
              Icon="user"
              name="name"
              label="User Name"
              className=""
            />
            <MttTextField
              readOnly={readOnly}
              Icon="email"
              name="email"
              label="Email"
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
              name="passConfirm"
              label="Confirm Password"
              className=""
            />
          </div>

          <div className=" mtt-center gap-4 !flex-col w-[250px]">
            <MttImageDisplay
              name="ProfileImage"
              className=" w-[250px] h-[150px]"
            />

            <MttImageFile
              readOnly={readOnly}
              name="ProfileImage"
              label="Profile Image"
            />

            <IsLoading className="w-full mtt-center" isLoading={FormIsloading}>
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
