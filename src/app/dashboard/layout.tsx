// "use client"

import "../../mainTailwind.css";
import { SideBar } from "./SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>

        <div className="flex ">

          <SideBar />
          <main className='grow'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
