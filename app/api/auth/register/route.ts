import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import { sql } from "@vercel/postgres";

export  async function POST(request: Request) {
try {
    
    const {email, password} = await request.json();
    //validation
    console.log({email, password});
    if (!email || !password) throw new Error("Missing parameters");

    // Check user in database
    const hashedPassword =await hash(password, 10);
    const response = await sql
    `INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`
    ;
} catch (e) {
    console.log({e});
}
 return NextResponse.json({messages: 'success'});
}