"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Plus,
    QrCode,
    SquareArrowOutUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { productSchema } from "@/validation/product";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SalesInvoice } from "@/types";
import { NotificationProvider } from "@/enums";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { notificationSchema } from "@/validation/notification";

export const columns: ColumnDef<z.infer<typeof notificationSchema>>[] = [
    {
        accessorKey: "provider",
        header: "Provider",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("provider")}</div>
        ),
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("content")}</div>
        ),
    },
];

export function DataTable({
    data,
}: {
    data: Array<z.infer<typeof notificationSchema>>;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const providerOptions = Object.values(NotificationProvider);

    return (
        <div className="w-full 3xl:w-3/4 mx-auto 3xl:mt-10 px-4 lg:px-6">
            <div className="flex items-center py-4">
                <>
                    <Select
                        value={
                            (table
                                .getColumn("provider")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onValueChange={(value) =>
                            table.getColumn("provider")?.setFilterValue(value)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {providerOptions.map((provider) => (
                                <SelectItem key={provider} value={provider}>
                                    {provider.charAt(0).toUpperCase() +
                                        provider.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            table.getColumn("provider")?.setFilterValue("")
                        }
                    >
                        Clear
                    </Button>
                </>
                <Link
                    href="/dashboard/notifications/create"
                    className="ml-auto"
                >
                    <Button variant="outline">
                        <Plus /> Add Notification
                    </Button>
                </Link>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    There are {table.getFilteredRowModel().rows.length} row(s)
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
