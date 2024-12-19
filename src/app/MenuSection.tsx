import { menuItems } from "./lib/Data";
import Menu from "./ui/menu/Menu";

export default function MenuSection({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div style={{ flexGrow: 1, display: "flex", height: "fit-content" }}>
            <div>
                <Menu items={menuItems}/>
            </div>
            {children}
        </div>
    )
}