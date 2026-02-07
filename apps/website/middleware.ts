import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    
    // Se esta tentando acessar admin e nao tem token, redirecionar para login
    if (isAdminRoute && !token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    
    // Se tem token e esta na rota de login, redirecionar para dashboard
    if (token && req.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso a rotas publicas
        if (req.nextUrl.pathname.startsWith('/admin/login')) {
          return true
        }
        
        // Requer autenticacao para outras rotas admin
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
