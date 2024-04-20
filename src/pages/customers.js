import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import axios from "axios";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

const now = new Date();

const Page = () => {
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(people, page, rowsPerPage);
    }, [page, rowsPerPage]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.id);
    }, [customers]);
  };

  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/customers/").then((res) => {
      console.log(res.data);
      setPeople(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Customers | Kronos.AI</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Customers</Typography>
              </Stack>
            </Stack>
            <CustomersSearch />
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectAll?.();
                          } else {
                            onDeselectAll?.();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map((customer) => {
                    return (
                      <TableRow hover key={customer.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(event) => {
                              if (event.target.checked) {
                                onSelectOne?.(customer.id);
                              } else {
                                onDeselectOne?.(customer.id);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={customer.avatar}>{getInitials(customer.username)}</Avatar>
                            <Typography variant="subtitle2">{customer.username}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
