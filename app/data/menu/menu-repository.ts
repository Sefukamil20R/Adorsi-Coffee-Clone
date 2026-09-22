import type { MenuListResult, MenuQuery } from "@/domain/menu/menu-item";
import { findMenuItems } from "./menu-datasource";

export class MenuRepository {
  async list(query: MenuQuery): Promise<MenuListResult> {
    const items = await findMenuItems(query);
    return { items, total: items.length };
  }
}

export const menuRepository = new MenuRepository();
