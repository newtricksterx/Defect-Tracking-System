'use server'
 
import { cookies } from 'next/headers'
 
export async function createCookie(name: string, value : string, httpOnly: boolean, path: string) {
  const cookieStore = cookies();
 
  cookieStore.set({
    name: name,
    value: value,
    httpOnly: httpOnly,
    path: path,
  })
}

export async function hasCookie(name: string){
  const cookieStore = cookies()
  const hasCookie = cookieStore.has(name)
  return hasCookie;
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function getCookie(name: string){
  const cookieStore = cookies()
  const cookie = cookieStore.get(name);
  return cookie?.value;
}