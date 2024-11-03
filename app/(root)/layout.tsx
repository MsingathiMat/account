
"use client"
import React from 'react'
import { MttNav, MttNavSwitch, MttSideNavToggler,MttNavHeader }  from '@/components/mtt/MttNavigation'

import { LayoutDashboardIcon } from 'lucide-react'
import MttIconTitle from '@/components/mtt/components/MttIconTitle'
import { MttModeToggler } from '@/components/mtt/components/MttModeToggler'
import AvatarAction from '@/components/mtt/components/mttAvatar/AvatarAction'
import AvatarLogout from '@/components/mtt/components/mttAvatar/AvatarLogout'
import MttAvatar from '@/components/mtt/components/mttAvatar/MttAvatar'


const layout = ({children}:{children:Readonly<React.ReactNode>}) => {
 
  const AvatarItems = [
    <AvatarAction key={0} label="Action" actionMethod={()=>{alert("Action")}}/>,
    <AvatarLogout key={1} label="Logout Now" />,
]
  return (
    <div className='relative mtt-center mtt-xy-screen !flex-col mtt-RightPadding ' >
      
   
<div className=' relative min-h-screen mtt-center !items-start  w-full h-full flex-1 '>
<MttNav type="DESKTOP" />

<div className=' flex-1 pl-[40px] w-full  h-full mtt-center !flex-col  min-h-screen'>

<div className=' mtt-center w-full  h-[60px]  pt-8 gap-6'>
<div className=' mr-auto'>
<MttNavSwitch />
</div>


<MttAvatar  title="User" AvatarItems={AvatarItems} user={{imageSrc:'/me.jpg'}}/>
<MttModeToggler/>

<MttSideNavToggler/>
      </div>
<div className=' mtt-center w-full h-[60px] mt-10'>


<MttIconTitle leftAligned icon={<LayoutDashboardIcon size={25}/>} className=' text-[25px]' title={<MttNavHeader/>}/>       
          

</div>
<div className=' w-full h-full pt-8 overflow-y-scroll pr-8  '>
{children}
</div>
</div>
</div>
    </div>
  )
}

export default layout
