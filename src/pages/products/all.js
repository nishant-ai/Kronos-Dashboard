import NextLink from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ProductCard } from "src/sections/products/product-card";
import { ProductSearch } from "src/sections/products/product-search";
import axios from "axios";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((req) => {
      console.log(req.data);
      setProducts(req.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Products | Kronos.AI</title>
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
                <Typography variant="h4">Products</Typography>
              </Stack>
              <div>
                <Button
                  href="/products/add"
                  component={NextLink}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add Product
                </Button>
              </div>
            </Stack>
            <ProductSearch />
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
