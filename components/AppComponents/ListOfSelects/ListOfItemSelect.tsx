"use client"
import IsLoading from '@/components/mtt/components/Isloading';
import { MtComboSearch } from '@/components/mtt/components/mttForm/mttForm';
import { QueryModels } from '@/components/mtt/config/ReactQueryConfig';
import withUtilities from '@/components/mtt/HOC/withUtilities';
import { UtilitiesProp } from '@/components/mtt/Types/MttTypes';
import { Items } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const OriginalComp = ({ Utilities }: { Utilities: UtilitiesProp }) => {
 
    const [SelectValues, SetSelectValues] = useState([{}])
 const {Read} = Utilities

 const CompQuery = useQuery({
    queryKey:[QueryModels.Items.QueryKey],
    queryFn: async ()=>{

        return Read<Items[]>("/api/root/dashboard/listOf/items/")
    }
 })

 const {data} = CompQuery

 console.log(data)


 useEffect(()=>{



    if(data){
  
    
      data.map((ItemData)=>{
    
      
          SetSelectValues([...SelectValues,{value:ItemData.ItemName,label:ItemData.ItemName,id:ItemData.ItemId}])
  
      })
     
    }
  },[data])
    return (
    <div>
   <IsLoading isLoading={false}>

   <MtComboSearch
          name="client"
          label="Select Client"
          placeholder="Choose Client"
          SelectValues={SelectValues as { value: string; label: string; id: string }[]}
          className='w-[250px]'
        />
   </IsLoading>
    </div>
  )
}
const LiftOfitemsSelect = withUtilities(OriginalComp);
export default LiftOfitemsSelect
