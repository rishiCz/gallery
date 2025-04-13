"use server"

import { delteImage } from "../api/images/[id]/label/controller"
import { revalidatePath } from 'next/cache';

export const deleteImageAction = async(formData: FormData)=>{
    const id = formData.get('id') as string
    await delteImage(id)
    revalidatePath('/admin')
}