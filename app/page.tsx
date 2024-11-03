"use client"
import { MttModeToggler } from "@/components/mtt/components/MttModeToggler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import { LayoutDashboardIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import MttImage from "@/components/mtt/components/MttImage";
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import FormRegister from "@/components/form";
import TableEvents from "@/components/table";
import Nav from "@/components/nav";
import MttArrowText from "@/components/mtt/components/MttArrowText";
import { MttStatsCard } from "@/components/mtt/components/MttStatsCard";
import { Heart, Wallet2 } from "lucide-react"; 
import AvatarAction from '@/components/mtt/components/mttAvatar/AvatarAction'
import AvatarLogout from '@/components/mtt/components/mttAvatar/AvatarLogout'
import MttAvatar from "@/components/mtt/components/mttAvatar/MttAvatar";

import MttDashBar from "@/components/mtt/components/MttDashBar";
import MttIconTitle from "@/components/mtt/components/MttIconTitle";
import MttNoSSR from "@/components/mtt/components/MttNoSSR";

export default function Home() {
  const AvatarItems = [
    <AvatarAction key={0} label="Action" actionMethod={()=>{alert("Action")}}/>,
    <AvatarLogout key={1} label="Logout Now" />,
]
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
  <MttNoSSR>

<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
     
     
      <MttIconTitle leftAligned icon={<LayoutDashboardIcon size={25}/>} className=' text-[25px]' title="Coded Design"/>       
          
      <div className=" mtt-center gap-1">
        <div className=" relative  h-[200px] shadow-md mtt-center w-[300px] ">
          <MttImage fill src="/me.jpg">
            <div
              key={"BaseLayer"}
              className=" w-full h-full mtt-center !flex-col "
            >
              <div className="flex-1"> </div>
              <div className=" !text-white  h-[50px] mtt-center gap-3 bg-pri w-full">
                Base layer
                <Heart size={20} />
              </div>
            </div>

            <div
              key={"HoverLaver"}
              className=" w-full h-full mtt-center !flex-col "
            >
              <div className="flex-1"> </div>
              <div className=" !text-white  h-[50px] mtt-center gap-3">
                No Alpha value
                <Heart size={20} />
              </div>
            </div>
          </MttImage>
        </div>
        </div>
     
    <MttDashBar link="/login" title="Matthew" description="Best Devloper" src="/me.jpg" statsItems={[{label:"Dev Projects",value:"96"},{label:"Monthly Sales",value:"R76"},{label:"Youtube Channels",value:"2"},{label:"Udemy Courses",value:"3"}]}/>     
          
      <MttAvatar  title="User" AvatarItems={AvatarItems} user={{imageSrc:'/me.jpg'}}/>

 
   <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2/>}/>  
          
          
      <MttArrowText className=""  title={"This is a link" } link="/log"/>
      <MttArrowText className="" identifier="3"  title={"Action version" } action={(i)=>{alert(i)}}/>         
           

<Nav />
     <TableEvents/>
     <FormRegister/>
     <MttModeToggler/> 
   
      <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
      <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and 
      </label>
    </div>
      <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
     
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
     
      <Badge>Badge</Badge>

      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
       <Input placeholder="Search"/>
     
      
      <Button variant="default" >Default</Button>

      <Button variant="secondary">Save</Button>

  
      </main>
   
    </div>
  </MttNoSSR>
  );
}
