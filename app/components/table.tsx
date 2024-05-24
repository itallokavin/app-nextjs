'use client'

import * as React from "react"
import { Input, Button, Link } from "@nextui-org/react";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import fetchClientes  from "./data";
import { Cliente } from './clientes/types';
import { FaTrash, FaPlus} from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const getClientes = async () => {
    try{
        const clientes = await fetchClientes();
        console.log(clientes)
    }
    catch(error){
        console.log('Erro na request de clientes')
    }
}
  
export const columns: ColumnDef<Cliente>[] = [
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
        <MdEdit size={'15px'} className="cursor-pointer" />
        <span>|</span>
        <FaTrash size={'15px'} className="cursor-pointer" />
      </div>
    ),
  },
]

const data: Cliente[] = [
  {
    nome: "Alice",
    sobrenome: "Silva",
    email: "alice.silva@gmail.com",
    data_nascimento: "1990-01-01",
  },
  {
    nome: "Beatriz",
    sobrenome: "Pereira",
    email: "beatriz.pereira@gmail.com",
    data_nascimento: "1988-02-15",
  },
  {
    nome: "Carlos",
    sobrenome: "Moraes",
    email: "carlos.moraes@gmail.com",
    data_nascimento: "1985-03-20",
  },
  {
    nome: "Daniela",
    sobrenome: "Santos",
    email: "daniela.santos@gmail.com",
    data_nascimento: "1992-04-10",
  },
  {
    nome: "Eduardo",
    sobrenome: "Oliveira",
    email: "eduardo.oliveira@gmail.com",
    data_nascimento: "1989-05-05",
  },
  {
    nome: "Fernanda",
    sobrenome: "Lima",
    email: "fernanda.lima@gmail.com",
    data_nascimento: "1991-06-18",
  },
  {
    nome: "Gabriel",
    sobrenome: "Costa",
    email: "gabriel.costa@gmail.com",
    data_nascimento: "1993-07-22",
  },
  {
    nome: "Helena",
    sobrenome: "Fernandes",
    email: "helena.fernandes@gmail.com",
    data_nascimento: "1990-08-30",
  },
  {
    nome: "Igor",
    sobrenome: "Almeida",
    email: "igor.almeida@gmail.com",
    data_nascimento: "1987-09-12",
  },
  {
    nome: "Juliana",
    sobrenome: "Souza",
    email: "juliana.souza@gmail.com",
    data_nascimento: "1994-10-01",
  },
  {
    nome: "Karen",
    sobrenome: "Ribeiro",
    email: "karen.ribeiro@gmail.com",
    data_nascimento: "1995-11-11",
  },
  {
    nome: "Lucas",
    sobrenome: "Barbosa",
    email: "lucas.barbosa@gmail.com",
    data_nascimento: "1992-12-25",
  },
  {
    nome: "Mariana",
    sobrenome: "Dias",
    email: "mariana.dias@gmail.com",
    data_nascimento: "1991-01-30",
  },
  {
    nome: "Nicolas",
    sobrenome: "Gomes",
    email: "nicolas.gomes@gmail.com",
    data_nascimento: "1990-02-17",
  },
  {
    nome: "Olivia",
    sobrenome: "Martins",
    email: "olivia.martins@gmail.com",
    data_nascimento: "1988-03-05",
  }
]

export default function TableClientes() {
    
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 });

    const table = useReactTable({
        data,
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
      const pageCount = Math.ceil(data.length / pagination.pageSize);  // Número total de páginas
      const currentPage = pagination.pageIndex + 1;  // Página atual

    return (
        <div className="w-full bg-white p-6 rounded-xl">
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Filtrar por nome..."
              value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("nome")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Link href="/clientes/cadastro">
                <Button className="text-white bg-azul" startContent={<FaPlus/>} >Novo Cliente</Button>
            </Link>
          </div>
          <div className="rounded-md border">
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
