import { ActionIcon, Menu as MenuComponent } from "@mantine/core";
import { Logout, Settings } from "tabler-icons-react";

function Menu() {
  return (
    <div>
      <MenuComponent
        control={
          <ActionIcon>
            <Settings size={23} />
          </ActionIcon>
        }
      >
        <MenuComponent.Item color="red" icon={<Logout size={17} />}>
          Logout
        </MenuComponent.Item>
      </MenuComponent>
    </div>
  );
}

export default Menu;
