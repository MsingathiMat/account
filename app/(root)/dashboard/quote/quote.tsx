"use client"
import React from 'react';
import MttForm, {
  MttComboSearch,
  MttSelect,
  MttSubmit,
  MttTextField,
} from '@/components/mtt/components/mttForm/mttForm';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import withUtilities from '@/components/mtt/HOC/withUtilities';
import { UtilitiesProp } from '@/components/mtt/Types/MttTypes';
import LiftOfitemsSelect from '@/components/AppComponents/ListOfSelects/ListOfItemSelect';
import MttpopulatedSelect from '@/components/mtt/components/mttForm/mttPopulatedSelect';
import GenerateSelectValues from '@/components/mtt/Helpers/GenerateSelectValues';
import { useQuery } from '@tanstack/react-query';
import { QueryModels } from '@/components/mtt/config/ReactQueryConfig';
import { Items } from '@prisma/client';
import { MttSearchCombo } from '@/components/mtt/components/mttSearchCombo';




const Quote = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const {
    Create,
    toast,
    QClient,
    ObjectToFormData,
    IsLoading,
    Read,
    ImageReset,
  } = Utilities;

  // Schema for form validation
const FormSchema = z.object({
  ClientId: z.string().min(1, 'Required'),
  UserId: z.string().min(1, 'Required'),
  items: z.array(
    z.object({
      itemName: z.string().min(1, 'Required'),
      itemType: z.enum(['Product', 'Service']),
      Description: z.string().min(1, 'Required'),
      quantity: z.number().optional(),
      amount: z.number(),
    })
  ),
});

type FormType = z.infer<typeof FormSchema>;
  const FormMethods = useForm<FormType>({
    defaultValues: {
     
      items: [{ itemName: '', itemType: 'Product', quantity: 1, amount: 0 }],
    },
    resolver: zodResolver(FormSchema),
  });

  const { control, handleSubmit, watch } = FormMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const ClientQuery = useQuery({
    queryKey:[QueryModels.Clients.QueryKey],
    queryFn: async ()=>{

        return Read<Items[]>("/api/root/dashboard/listOf/clients/")
    }
 })

  const CompQuery = useQuery({
    queryKey:[QueryModels.Items.QueryKey],
    queryFn: async ()=>{

        return Read<Items[]>("/api/root/dashboard/listOf/items/")
    }
 })


 const {data, isPending} = CompQuery
 console.log(data)
 const {data:ClientData, isPending:ClientPending} = ClientQuery
  const items = watch('items');
  const sumTotal = items.reduce((sum, item) => sum + (item.quantity || 0) * item.amount, 0);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    
    // Mutation or post logic for the form data
    console.log('Form Submitted:', data);
    // Create('/api/invoice', formData)
    //   .then(() => {
    //     QClient.invalidateQueries(['getInvoices']);
    //     toast({ title: 'Success', description: 'Invoice created successfully' });
    //     formMethods.reset();
    //   })
    //   .catch(() => {
    //     toast({ title: 'Error', description: 'Failed to create invoice' });
    //   });
  };


  console.log(FormMethods.watch("items")[0].itemName)
  return (
    <div className=" mtt-Alpha w-full mtt-center !flex-col !items-start !justify-start pt-8">
    <div className=' px-[38px] mtt-center !justify-between w-full'>
    <h4 className="text-2xl font-normal mb-4"> R{sumTotal.toFixed(2)}</h4>

      
<h3 className="text-right text-lg  ">
QTNO: 00005
  </h3>
    </div>
      <MttForm
  
 debugMode
        onSubmit={onSubmit}
        Methods={FormMethods}
        className="space-y-4 w-full "
      >
     
     

                           
<IsLoading className=' mtt-center mr-auto' isLoading={ClientPending}>

{
        ClientData&&            <MttComboSearch

        className=' w-[150px]'
    
      name="ClientId"
      label='Client'
       
          placeholder="Choose Client"
          SelectValues={ GenerateSelectValues(
           {
            IdColumn:'ClientId' ,
            NameColumn:'ClientName' ,
            data:ClientData
           }
          
          )}
        />
      }
</IsLoading>
{/* 
<LiftOfitemsSelect IdColumn='ItemId' NameColumn='ItemName' Placeholder='Select Item' endpoint='/api/root/dashboard/listOf/items/'/> */}



        {/* Invoice Items Table */}
        <div className="overflow-x-auto w-full mtt-Alpha">
          <table className="w-full  shadow rounded-lg">
            <thead className=' bg-BaseShadeDark h-[60px]'>
              <tr className="">
                <th className="p-2 text-left">Item Name</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="p-2">
                   
<IsLoading className=' mtt-center' isLoading={isPending}>

{
        data&&            <MttComboSearch

        className=' w-[150px]'
        callBack={(val)=>{

          const selectedItem = data.find((item) => item.ItemId === val);
          if (selectedItem) {
            FormMethods.setValue(`items.${index}.Description`, selectedItem.Description);
            FormMethods.setValue(`items.${index}.amount`, parseInt(selectedItem.Amount.toString()));
          }
        }}
           name={`items.${index}.itemName`}
                      label=""
          placeholder="Choose Client"
          SelectValues={ GenerateSelectValues(
           {
            IdColumn:'ItemId' ,
            NameColumn:'ItemName' ,
            data:data
           }
          
          )}
        />
      }
</IsLoading>


                  
                  </td>
                  <td className="p-2">
          
          <MttTextField
            name={`items.${index}.Description`}
  className=' border-none text-gray-500'
            label=""
            readOnly={true}
          />
     
      </td>
                  <td className="p-2">
          
                      <MttTextField
                      className=' !w-[60px]'
                        name={`items.${index}.quantity`}
                        type="number"
                        label=""
                        readOnly={false}
                      />
                 
                  </td>
                  <td className="p-2">
                    <MttTextField
                      name={`items.${index}.amount`}
                       className=' border-none text-gray-500 w-[100px]'
                      type="number"
                      label=""
                      readOnly={false}
                    />
                  </td>
                  <td className="p-2">
                    ${(items[index].quantity || 1) * items[index].amount}
                  </td>
                  <td className="p-2 w-[50px]">
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-Pri hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() =>
              append({ itemName: '', itemType: 'Product', quantity: 1, amount: 0 })
            }
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus size={20} />
            <span className="ml-2">Add Item</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-right mt-4">
          <IsLoading isLoading={false}>
            <MttSubmit>Generate Invoice</MttSubmit>
          </IsLoading>
        </div>
      </MttForm>
    </div>
  );
};

const QuoteWithUtilities = withUtilities(Quote);
export default QuoteWithUtilities;
