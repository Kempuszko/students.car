import "./globals.css";
import CustomToast from "./_components/CustomToast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen transition-colors bg-background text-gold-light">
        {children}
        <CustomToast />
      </body>
    </html>
  );
}
