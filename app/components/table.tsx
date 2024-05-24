'use client'

import * as React from "react"
import { Input, Button, Link } from "@nextui-org/react";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import {ColumnDef,ColumnFiltersState,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,useReactTable} from "@tanstack/react-table";
import { Cliente } from './validacoes/types';
import { FaTrash, FaPlus} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import getClientes  from "./data";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from '@chakra-ui/react'

export default function TableClientes() {
    const columns: ColumnDef<Cliente>[] = [
      {
        accessorKey: "nome",
        header: "Nome",
        cell: ({ row }:any) => (
          <div className="capitalize">{row.getValue("nome")}</div>
        ),
      },
      {
        accessorKey: "sobrenome",
        header: "Sobrenome",
        cell: ({ row }:any) => (
          <div className="capitalize">{row.getValue("sobrenome")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }:any) => (
          <div className="lower">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "data_nascimento",
        header: "Data de Nascimento",
        cell: ({ row }:any) => (
          <div className="capitalize">{row.getValue("data_nascimento")}</div>
        ),
      },
      {
        accessorKey: "acao",
        header: "Ações",
        cell: ({ row }:any) => (
          <div className="flex gap-4 items-center">
            <MdEdit size={'15px'} className="cursor-pointer" onClick={() => handleEdit(row.original.id)} />
            <span>|</span>
            <FaTrash size={'15px'} className="cursor-pointer" onClick={() => handleDelete(row.original.id)} />
          </div>
        ),
      },
    ]

    const [clientes, setClientes] = React.useState<Cliente[]>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });

    const router = useRouter();
    const toast = useToast();

    React.useEffect(() => {
      const fetchData = async () => {
        const data = await getClientes();
        setClientes(data);
      };
      fetchData();
    }, []);

    const handleEdit = (id:number) => {
      router.push(`/clientes/atualizar?id=${id}`)
    }

    const handleDelete = async (id: number) => {
      try {
        await axios.delete(`http://localhost:8000/clientes/${id}`);
        setClientes((prevClientes) => prevClientes.filter(cliente => cliente.id !== id));
        return (
          toast({
            title: 'Cliente Excluído',
            status: 'success',
            duration: 3000,
            position: 'bottom-left',
            isClosable: true,
          })
        )
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }
    };

    const table = useReactTable({
        data : clientes,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          columnFilters,
          pagination
        },
        onPaginationChange: setPagination,
      })
      const pageCount = Math.ceil(clientes.length / pagination.pageSize);  // Número total de páginas
      const currentPage = pagination.pageIndex + 1;  // Página atual

    return (
        <div className="w-full bg-white p-6 rounded-xl">
          <div className="flex items-center justify-between py-4 max-sm:flex-col max-sm:gap-6 max-sm:items-start">
            <Input
              isClearable
              placeholder="Buscar por nome"  
              variant="bordered"
              value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("nome")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Link href="/clientes/cadastro" className="max-w-sm">
                <Button className="text-white bg-azul " startContent={<FaPlus/>} >Novo Cliente</Button>
            </Link>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-azul text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
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
                      Nenhum resultado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div>Página {currentPage} de {pageCount}</div>
            <div className="space-x-2">
              <Button
                variant="bordered"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="bordered"
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

