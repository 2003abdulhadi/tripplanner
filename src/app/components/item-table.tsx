"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { ItemRow, ProviderRow } from "@/lib/types";
import { getProviderColumns, itemColumns } from "./columns";
import { Fragment } from "react";
import ProvideItemButton from "./add-provider";

interface ItemTableProps {
  itemCategories: { slug: string; label: string }[];
  items: ItemRow[];
  currentUser?: string | undefined;
}

export function ItemTable({
  itemCategories,
  items,
  currentUser = undefined,
}: ItemTableProps) {
  return (
    <Tabs defaultValue={itemCategories[0].slug} className="flex-auto">
      <TabsList>
        {itemCategories.map(({ slug, label }) => (
          <TabsTrigger value={slug} key={slug}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {itemCategories.map(({ slug }) => (
        <TabsContent value={slug} key={slug}>
          <DataTable<ItemRow, unknown>
            columns={itemColumns}
            data={items.filter((i) => i.itemCategorySlug === slug)}
            renderSubRow={(item) => {
              if (item.Provider.length === 0) {
                return (
                  <Fragment>
                    <em>No providers yet.</em>
                    {currentUser ? (
                      <ProvideItemButton itemName={item.name} />
                    ) : (
                      <></>
                    )}
                  </Fragment>
                );
              }
              return (
                <Fragment>
                  <DataTable<ProviderRow, unknown>
                    columns={getProviderColumns(currentUser)}
                    data={item.Provider}
                  />
                  {currentUser ? (
                    <ProvideItemButton itemName={item.name} />
                  ) : (
                    <></>
                  )}
                </Fragment>
              );
            }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
