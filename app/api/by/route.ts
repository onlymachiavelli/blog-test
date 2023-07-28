import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/fakeDatas/blog';

export async function GET(req: NextRequest, res: NextResponse) {
  // Dynamic route
  const url = new URL(req.url || '')
  const id:any = url.searchParams.get('id')
  if (isNaN(id)) {
    return new Response(
        JSON.stringify("Invalid ID"),
        { status: 400 },
    )
     
  }

  let data : any 
  for (let i =0;i<blogs.length;i++) {
    if (blogs[i].id == id) {
      data = blogs[i]
      break
    }
  }
  if (!data) {
    return new Response(
        JSON.stringify("Not Found"),
        { status: 404 },
    )
  }
   
  return NextResponse.json(data)
}
