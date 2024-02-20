import { SlRefresh } from "react-icons/sl";
import { MdSettings } from "react-icons/md";

interface HeaderProps {
  scan: () => void
}

export default function Header({scan} : HeaderProps) {
  return (
    <div className={`p-4 flex flex-row `}>
      <div className={`ml-auto flex flex-row gap-4 text-2xl`}>
        <button onClick={scan}><SlRefresh/></button>
        <button><MdSettings/></button>
      </div>
    </div>
  )
}