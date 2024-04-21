import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Avatar,
  Card,
  CardContent,
  SvgIcon,
  Box,
  Container,
  Stack,
  Typography,
  ImageList,
  ImageListItem,
  Grid,
  Button,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Divider,
} from "@mui/material";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import DeviceTabletIcon from "@heroicons/react/24/solid/DeviceTabletIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import { Chart } from "src/components/chart";
import { useTheme } from "@mui/material/styles";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useEffect, useState } from "react";
import axios from "axios";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  ),
};

const OverviewComments = (props) => {
  const { title, comments = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <List>
        {comments?.map((comment, index) => {
          const hasDivider = index < comment.length - 1;

          return (
            <ListItem divider={hasDivider} key={comment.id}>
              <ListItemText
                primary={comment?.comment}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all (490+)
        </Button>
      </CardActions>
    </Card>
  );
};

const CurrentPrice = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Current Price
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "info.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

const SuggestedPrice = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Suggested Price
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack sx={{ marginY: "2.5vh" }}>
          <Button variant="outlined" size="small">
            Set Price
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

function StandardImageList() {
  return (
    <ImageList sx={{ width: 800, height: 400 }} cols={4} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.name}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1675868374286-f98715cbc7af",
  },
  {
    img: "https://images.unsplash.com/photo-1675868374360-3af667d58bf8",
  },
  {
    img: "https://images.unsplash.com/photo-1675868375184-8d711f447b28",
  },
  {
    img: "https://images.unsplash.com/photo-1675868374826-c439570927ff",
  },
  {
    img: "https://images.unsplash.com/photo-1675868375184-8d711f447b28",
  },
  {
    img: "https://images.unsplash.com/photo-1675868374826-c439570927ff",
  },
  {
    img: "https://images.unsplash.com/photo-1675868375184-8d711f447b28",
  },
  {
    img: "https://images.unsplash.com/photo-1675868374826-c439570927ff",
  },
];

const Page = () => {
  const [product, setProduct] = useState("");
  const [posCom, setPosCom] = useState([]);
  const [negCom, setNegCom] = useState([]);
  const [allCom, setAllCom] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const prodId = url.split("/")[4];

    axios.get(`http://localhost:8000/api/product/${prodId}/`).then((req) => {
      setProduct(req.data);
    });

    axios
      .get(`http://localhost:8000/api/prod_comments?sentiment=ALL&product=${prodId}`)
      .then((req) => {
        setAllCom(req.data);
      });

    axios
      .get(`http://localhost:8000/api/prod_comments?sentiment=POS&product=${prodId}`)
      .then((req) => {
        setPosCom(req.data);
        console.log(posCom);
      });

    axios
      .get(`http://localhost:8000/api/prod_comments?sentiment=NEG&product=${prodId}`)
      .then((req) => {
        setNegCom(req.data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Product | Kronos.AI</title>
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
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{product.name}</Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <StandardImageList />
                <Stack spacing={2}>
                  <CurrentPrice value={`$ ${product.price}`} />
                  <SuggestedPrice value={`$ ${product.recommended_price}`} ß />
                </Stack>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h5">Sales Prediction</Typography>
              </Stack>

              <Grid>
                <OverviewSales
                  title="Sales"
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

              <Grid>
                <OverviewSales
                  title="Revenue"
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

              <Stack spacing={1}>
                <Typography variant="h5">Sentiment Analysis</Typography>
              </Stack>

              <Grid container spacing={1}>
                <Grid item md={4}>
                  <OverviewComments
                    title="All Comments"
                    comments={allCom}
                    sx={{ height: "100%" }}
                  />
                </Grid>

                <Grid item md={4}>
                  <OverviewComments
                    title="Positive Comments"
                    comments={posCom}
                    sx={{ height: "100%" }}
                  />
                </Grid>

                <Grid item md={4}>
                  <OverviewComments
                    title="Negative Comments"
                    comments={negCom}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
