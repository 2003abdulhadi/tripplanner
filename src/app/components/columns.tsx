"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ItemRow, ProviderRow } from "@/lib/types";
import { EditProviderDialog } from "./edit-provider-dialog";

export const itemColumns: ColumnDef<ItemRow>[] = [
  {
    accessorKey: "name",
    header: "Item",
    cell: (info) => {
      const { name, note } = info.row.original;
      return (
        <div className="flex items-baseline">
          <span>{name}</span>
          {note && (
            <span className="ml-2 text-sm italic text-gray-500">({note})</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "needed",
    header: "Needed",
  },
  {
    id: "providerQuantitySum",
    header: "Provided",
    accessorFn: (row) =>
      Array.isArray(row.Provider)
        ? row.Provider.reduce(
            (sum, provider) =>
              sum +
              (typeof provider.quantity === "number" ? provider.quantity : 0),
            0
          )
        : 0,
  },
];

export const providerColumns: ColumnDef<ProviderRow>[] = [
  {
    accessorKey: "userName",
    header: "Provider",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => {
      const desc = info.getValue<string | undefined>();
      return desc ? (
        desc
      ) : (
        <span className="text-gray-500 italic">No description</span>
      );
    },
  },
];

export const getProviderColumns = (currentUserId?: string) => {
  const cols: ColumnDef<ProviderRow>[] = [
    { accessorKey: "userName", header: "Provider" },
    { accessorKey: "quantity", header: "Qty" },
    {
      accessorKey: "description",
      header: "Notes",
      cell: (info) =>
        info.getValue() ?? <em className="text-gray-500 italic">No notes</em>,
    },
  ];

  if (currentUserId) {
    cols.push({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const row = info.row.original;
        return row.userId === currentUserId ? (
          <EditProviderDialog provider={row} currentUser={currentUserId} />
        ) : null;
      },
    });
  }

  return cols;
};
