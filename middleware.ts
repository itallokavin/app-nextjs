import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req: NextRequest) {
  const cookiesStore  = cookies();
  const token = cookiesStore.has('access_token');
  
  if(token){
    // Se existir token e tentar acessar a rota de login, redireciona para /home
    if(req.nextUrl.pathname === '/'){
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }else{
    // Se não existe o token redireciona para rota de login '/'
    if (req.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/', '/home', '/clientes']
}