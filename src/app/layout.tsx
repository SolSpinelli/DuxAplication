
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './globals.css'
import { InputIcon } from 'primereact/inputicon';
import { Header } from './ui/header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="main-section">
        <Header 
          logo
          actions={[<InputIcon className="pi pi-cog icon"/>]} 
          style={{
            padding: "0px 13px 0px 8px"
          }}
          />
        {children}
      </div>
      </body>
    </html>
  );
}