import "./globals.css";
import { Dosis } from "next/font/google";

const dosis = Dosis({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dosis",
  weight: ["500"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dosis.variable} font-dosis`}>
      <body className="bg-gradient-to-b from-[#091925] to-[#275173] text-white h-screen flex flex-col text-4xl p-8">
        {children}
      </body>
    </html>
  );
}
