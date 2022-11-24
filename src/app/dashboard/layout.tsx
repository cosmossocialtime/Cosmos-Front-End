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

        <div className="flex overflow-x-hidden">

          <SideBar />
          <main className='grow'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
