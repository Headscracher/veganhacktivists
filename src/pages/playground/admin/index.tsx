import { RequestStatus } from '@prisma/client';
import { ColDef } from 'ag-grid-community';
import DataGrid, { SortingOptions } from 'components/dataGrid';
import { trpc } from 'lib/client/trpc';
import { FilterOption } from 'lib/services/playground/schemas';
import { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import { RequestEntry } from 'server/routers/playground/admin';

const RequestOverview: NextPage = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState<SortingOptions | null>(null);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [search, setSearch] = useState('');

  const { data, refetch } = trpc.playground.admin.getRequests.useQuery(
    { sort: sorting, pageSize, page: currentPage, filters, search },
    { keepPreviousData: true }
  );
  const columns: ColDef<RequestEntry>[] = [
    { field: 'id', hide: true },
    { field: 'title', headerName: 'Title' },
    { field: 'description', headerName: 'Description' },
    { field: 'organization.name', headerName: 'Organization', editable: false },
    { field: 'requester.name', headerName: 'Requestor', editable: false },
    { field: 'neededVolunteers', headerName: 'Needed Volunteers', type: 'number', cellEditor: 'agNumberCellEditor', cellEditorParams: { min: 1, valueParser: (val: string) => parseInt(val) },},
    { field: 'dueDate', type: 'date' },
    { field: 'requiredSkills' },
    { field: 'status', cellEditor: 'agSelectCellEditor', cellEditorParams: { values: Object.keys(RequestStatus) },},
  ];

  const handleValueChange = useCallback(
    async (data: RequestEntry) => {
      // const { request, ...rest } = data;

      // await mutateAsync(rest);
      await refetch();
    },
    [refetch]
  );

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
    []
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <DataGrid
        data={data}
        columns={columns}
        onUpdate={handleValueChange}
        onSortChange={setSorting}
        onPaginationChange={handlePaginationChange}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />
    </div>
  );
};

export default RequestOverview;
