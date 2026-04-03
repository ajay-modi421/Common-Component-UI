import React from 'react';
import DataTable from '@/Components/Table/DataTable';

// ─── Preview section wrapper ──────────────────────────────────────────────────
const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
      {label}
    </p>
    {children}
  </div>
);

// ─── Shared mock data ─────────────────────────────────────────────────────────

const USERS = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@example.com',  role: 'Admin',   status: 'Active',   joined: '2023-01-15' },
  { id: 2, name: 'Bob Smith',      email: 'bob@example.com',    role: 'Editor',  status: 'Active',   joined: '2023-03-22' },
  { id: 3, name: 'Carol White',    email: 'carol@example.com',  role: 'Viewer',  status: 'Inactive', joined: '2023-06-10' },
  { id: 4, name: 'David Brown',    email: 'david@example.com',  role: 'Editor',  status: 'Active',   joined: '2023-08-05' },
  { id: 5, name: 'Eva Martinez',   email: 'eva@example.com',    role: 'Admin',   status: 'Active',   joined: '2024-01-20' },
  { id: 6, name: 'Frank Lee',      email: 'frank@example.com',  role: 'Viewer',  status: 'Pending',  joined: '2024-02-14' },
  { id: 7, name: 'Grace Kim',      email: 'grace@example.com',  role: 'Editor',  status: 'Active',   joined: '2024-03-30' },
];

const ORDERS = [
  { id: '#1001', product: 'Pro Plan',    customer: 'Alice Johnson', amount: 49,  qty: 1, status: 'Paid',    date: '2024-04-01' },
  { id: '#1002', product: 'Starter Kit', customer: 'Bob Smith',     amount: 120, qty: 3, status: 'Pending', date: '2024-04-03' },
  { id: '#1003', product: 'Enterprise',  customer: 'Carol White',   amount: 299, qty: 1, status: 'Paid',    date: '2024-04-05' },
  { id: '#1004', product: 'Pro Plan',    customer: 'David Brown',   amount: 49,  qty: 2, status: 'Failed',  date: '2024-04-07' },
  { id: '#1005', product: 'Starter Kit', customer: 'Eva Martinez',  amount: 120, qty: 1, status: 'Paid',    date: '2024-04-09' },
];

// ─── Column definitions ───────────────────────────────────────────────────────

// Variant 1 — User table columns with custom badge renders
const USER_COLUMNS = [
  { key: 'id',     label: 'ID',     width: '60px',  align: 'center', sortable: false },
  { key: 'name',   label: 'Name',   sortable: true },
  { key: 'email',  label: 'Email',  sortable: true },
    {
      key: 'role',
      label: 'Role',
      align: 'center',
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
    },
    { key: 'joined', label: 'Joined', sortable: true, align: 'right' }
];

// Variant 2 — Orders table columns
const ORDER_COLUMNS = [
  { key: 'id',       label: 'Order',    width: '80px' },
  { key: 'product',  label: 'Product',  sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'qty',      label: 'Qty',      align: 'center', sortable: true, width: '60px' },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    sortable: true,
    render: (val) => <span className="font-medium">${val}</span>,
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    },
  { key: 'date', label: 'Date', align: 'right', sortable: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const DataTablePage = () => (
  <div className="p-8 max-w-5xl mx-auto">
    <h1 className="text-xl font-bold mb-1">Data Table</h1>
    <p className="text-sm text-muted-foreground mb-8">
      Fully dynamic table — columns, data, sorting, search, pagination and custom cell renders are all prop-driven.
    </p>

    {/* ── Variant 1: Users table (default settings) ── */}
    <Section label="Default — Users">
      <DataTable
        title="Users"
        description="All registered users in the system"
        columns={USER_COLUMNS}
        data={USERS}
        pageSize={5}
        onRowClick={(row) => alert(`Clicked: ${row.name}`)}
      />
    </Section>

    {/* ── Variant 2: Orders table (striped + bordered, no search) ── */}
    <Section label="Striped & Bordered — Orders">
      <DataTable
        title="Orders"
        description="Recent transactions"
        columns={ORDER_COLUMNS}
        data={ORDERS}
        striped
        bordered
        searchable={false}
        pageSize={5}
      />
    </Section>

  </div>
);

export default DataTablePage;