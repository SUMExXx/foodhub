import { contents, webData } from "@/data/website";
import Image from "next/image";

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import MenuGrid from "../components/MenuGrid";

export default function Menu() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MenuGrid/>
    </main>
  );
}
