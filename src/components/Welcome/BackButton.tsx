import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

interface BackButtonProps {
  link: string;
}

export function BackButton({ link }: BackButtonProps) {
  return (
    <div>
      <Link href={link} className="fixed top-[10%] left-[5%] p-3 backdrop-blur-md rounded-[50%] text-zinc-50 bg-zinc-800/30 hover:bg-purple-500 focus:bg-purple-500 cursor-pointer">
        <ArrowLeft weight="bold" />
      </Link>
    </div>
  );
}
