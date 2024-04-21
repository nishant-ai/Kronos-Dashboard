import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Stack, Typography, Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewRevenue } from "src/sections/overview/overview-revenue";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useEffect, useState } from "react";
import axios from "axios";

const now = new Date();

const Page = () => {
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState("");

  const [genderCompo, setGenderCompo] = useState({
    male_compo: 0,
    female_compo: 0,
    others_compo: 0,
  });
  const [ageGroup, setAgeGroup] = useState({ under_25: 0, under_40: 0, under_75: 0 });
  const [highPerfProds, setHighPerfProds] = useState();
  const [lowPerfProds, setLowPerfProds] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [latestProds, setLatestProds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/satisfaction").then((res) => {
      setSatisfactionRate(res.data["satisfaction_rate"]);
    });

    axios.get("http://localhost:8000/api/customer_count").then((res) => {
      setCustomerCount(res.data["customer_count"]);
    });

    axios.get("http://localhost:8000/api/total_revenue").then((res) => {
      setRevenue(res.data["revenue"]);
    });

    axios.get("http://localhost:8000/api/total_profit").then((res) => {
      setProfit(res.data["profit"]);
    });

    axios.get("http://localhost:8000/api/gender_compo").then((res) => {
      setGenderCompo(res.data);
      console.log(genderCompo);
    });

    axios.get("http://localhost:8000/api/age_groups").then((res) => {
      setAgeGroup(res.data);
      console.log(ageGroup);
    });

    axios.get("http://localhost:8000/api/latest_orders").then((res) => {
      setLatestOrders(res.data);
      console.log(latestOrders);
    });

    axios.get("http://localhost:8000/api/latest_products").then((res) => {
      setLatestProds(res.data);
      console.log(latestProds);
    });

    axios.get("http://localhost:8000/api/high_perf_prods").then((res) => {
      setHighPerfProds(res.data);
      console.log(highPerfProds);
    });

    axios.get("http://localhost:8000/api/low_perf_prods").then((res) => {
      setLowPerfProds(res.data);
      console.log(lowPerfProds);
    });
  }, []);

  return (
    <>
      <Head>
        <title>God View | Kronos.AI</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewRevenue
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={`$ ${revenue}`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={`$ ${profit}`} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={customerCount.toString()}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={satisfactionRate} />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                title="Gender Composition"
                chartSeries={[
                  genderCompo?.male_compo,
                  genderCompo?.female_compo,
                  genderCompo?.others_compo,
                ]}
                labels={["Male", "Female", "Others"]}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                title="Age Group"
                chartSeries={[ageGroup?.under_25, ageGroup?.under_40, ageGroup?.under_75]}
                labels={["Under 25", "Under 40", "Under 70"]}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} lg={12}>
              <OverviewSales
                title="Sales Projection"
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} lg={12}>
              <OverviewSales
                title="Revenue Projection"
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={6}>
              <OverviewLatestProducts
                title="High Performing Products"
                products={highPerfProds}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={6}>
              <OverviewLatestProducts
                title="Low Performing Products"
                products={lowPerfProds}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders orders={latestOrders} sx={{ height: "100%" }} />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts products={latestProds} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
