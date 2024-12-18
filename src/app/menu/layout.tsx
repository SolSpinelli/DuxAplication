import { Suspense } from "react";
import Menu from "../ui/menu/Menu";

export default function MenuLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const items = [
      {
          id: "item1",
          ref:"/menu/usuarios",
          tooltip: "Usuarios"

      },
      {
          id: "item2",
          tooltip: "Item 2"
      },
      {
          id: "item3",
          tooltip: "Item 3",
      },
      {
          id: "item4",
          tooltip: "Item 4",
      },
      {
          id: "item5",
          tooltip: "Item 5",
      },
      {
          id: "item6",
          tooltip: "Item 6",
      },
  ]

    return (
        <div style={{ flexGrow: 1, display: "flex", height: "100vh" }}>
        <div>
            <Menu items={items}/>
        </div>

        <Suspense fallback={<div> Loading</div>}>
          {children}
        </Suspense>
    </div>
    );
  }

