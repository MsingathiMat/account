"use client"
import React from 'react';
import MttForm, {
  MtComboSearch,
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

const newObg = [
  { value: 'One Dime', label: 'One Dime', id: '1' },
  { value: 'Vula Media', label: 'Fasi Funeral', id: '2' },
  { value: 'Vula Media', label: 'Bright Star', id: '3' },
];

// Schema for form validation
const FormSchema = z.object({
  client: z.string().min(1, 'Required'),
  items: z.array(
    z.object({
      itemName: z.string().min(1, 'Required'),
      itemType: z.enum(['Product', 'Service']),
      quantity: z.number().optional(),
      amount: z.number().positive(),
    })
  ),
});

type FormType = z.infer<typeof FormSchema>;

const Quote = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const {
    Create,
    toast,
    QClient,
    ObjectToFormData,
    IsLoading,
    ImageReset,
  } = Utilities;

  const formMethods = useForm<FormType>({
    defaultValues: {
      client: '',
      items: [{ itemName: '', itemType: 'Product', quantity: 1, amount: 0 }],
    },
    resolver: zodResolver(FormSchema),
  });

  const { control, handleSubmit, watch } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

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

  return (
    <div className=" mtt-Alpha w-full mtt-center !flex-col !items-start !justify-start pt-8">
    <div className=' px-[38px] mtt-center !justify-between w-full'>
    <h4 className="text-2xl font-normal mb-4"> R{sumTotal.toFixed(2)}</h4>

      
<h3 className="text-right text-lg  ">
QTNO: 00005
  </h3>
    </div>
      <MttForm
        onSubmit={onSubmit}
        Methods={formMethods}
        className="space-y-4 w-full "
      >
     
        <MtComboSearch
          name="client"
          label="Select Client"
          placeholder="Choose Client"
          SelectValues={newObg as { value: string; label: string; id: string }[]}
          className='w-[250px]'
        />

<LiftOfitemsSelect/>

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
                   
                  <MtComboSearch
           name={`items.${index}.itemName`}
                      label="Item Name"
          placeholder="Choose Client"
          SelectValues={newObg as { value: string; label: string; id: string }[]}
        />
                  
                  </td>
                  <td className="p-2">
          
          <MttTextField
            name={`items.${index}.quantity`}
  
            label="Description"
            readOnly={false}
          />
     
      </td>
                  <td className="p-2">
          
                      <MttTextField
                        name={`items.${index}.quantity`}
                        type="number"
                        label="Quantity"
                        readOnly={false}
                      />
                 
                  </td>
                  <td className="p-2">
                    <MttTextField
                      name={`items.${index}.amount`}
                      type="number"
                      label="Amount"
                      readOnly={false}
                    />
                  </td>
                  <td className="p-2">
                    ${(items[index].quantity || 1) * items[index].amount}
                  </td>
                  <td className="p-2">
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
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
