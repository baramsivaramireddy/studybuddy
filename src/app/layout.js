
import "./globals.css";



export const metadata = {
  title: "Question buddy",
  description: "study buddy who helps in understanding topics",
};




import Providers from "./providers";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased    min-h-screen  max-h-screen `}
      >

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
