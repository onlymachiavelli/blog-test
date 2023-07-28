// api/bruh/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';
import blogs from '@/fakeDatas/blog';

export async function GET(req: NextRequest,res : NextResponse) {
    //return json response with json message 
    if (req.method === 'GET'){
       return NextResponse.json(blogs)
    }
}