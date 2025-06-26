import { ThemeSwitch } from "./theme-switch";

export default function Footer() {
  return (
    <div className="flex p-4 flex-row-reverse">
      <div className="bg-background outline-1 outline-foreground p-2 rounded-2xl flex">
        <ThemeSwitch />
      </div>
    </div>
  );
}
