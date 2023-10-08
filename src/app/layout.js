import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Inter } from 'next/font/google'
import GlobalBar from './globalBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Project Management System',
  description: 'The platform for smarter work management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">      
      <body className={inter.className}>
        <GlobalBar></GlobalBar>
        <div className='contentsContainer'>
          {children}
        </div>
      </body>
    </html>
  )
}
