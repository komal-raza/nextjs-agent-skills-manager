"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addSkill } from "../skills/SKILLS";



export async function createSkill(prevState:any, formData:FormData){
    const name= formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;


    if(!name || !description || !category){
        return {
            message:"Please fill in all fields"
        }
    }


    const newSkill = {
        id:Date.now().toString(),
        name,
        description,
        category,
        createdAt:new Date().toISOString(),
        updatedAt:new Date().toISOString()
    }
    // Save Skill


    await addSkill(newSkill)
    revalidatePath("/skills");
    redirect("/skills");
}
