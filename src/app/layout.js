import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import ReduxProviderWrapper from '@/components/ReduxProviderWrapper';
import logo from '@/assets/logo.jpg';

export const metadata = {
  title: 'React-Food',
  description: 'Order Food of your choice',
  image: '../assets/logo.jpg',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
      </body>
    </html>
  );
}
