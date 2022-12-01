"use client"

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
          <div className='grow'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
