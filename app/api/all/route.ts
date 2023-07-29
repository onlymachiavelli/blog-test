// api/bruh/route.ts

import { NextRequest, NextResponse } from 'next/server'
import blogs from '@/fakeDatas/blog'

export async function GET(req: NextRequest,res : NextResponse) {
    
    if (req.method === 'GET'){

    const url = new URL(req.url || '')
    const pagination:any = url.searchParams.get('pg')


    let response = [] 
    if (pagination) {
        

        if (isNaN(pagination)) {
            return new Response(
                JSON.stringify("Invalid ID"),
                { status: 400 },
            )
             
          }
        let start = (pagination-1)*2
        let end = start+2
        if (start >= blogs.length) {
            return new Response(
                JSON.stringify("Not Found"),
                { status: 404 },
            )
        }
        if (end >= blogs.length) {
            end = blogs.length
        }
        response = blogs.slice(start,end)
        return NextResponse.json(response)
        
    }
    }

    return new Response(
        JSON.stringify("Invalid Request"),
        { status: 400 },
    )
}