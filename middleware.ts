import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req: NextRequest) {
  const cookie = req.cookies;
  console.log(cookie)

  
}

export const config = {
    matcher: ['/', '/home']
}