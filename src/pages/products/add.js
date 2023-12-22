import { useState, useCallback } from "react";
import Head from "next/head";
import {
  CardHeader,
  CardContent,
  Card,
  TextField,
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  CardActions,
  Button,
  Input,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const AccountProfileDetails = () => {
  const [values, setValues] = useState({});

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const ImageInput = ({ onImageChange }) => {
    const [image, setImage] = useState("");

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    return (
      <Box>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-input"
        />
        <label htmlFor="image-input">
          <Button component="span" variant="outlined" color="primary" sx={{ width: "100%" }}>
            Select Image
          </Button>
        </label>
        {image && (
          <img src={image} alt="Selected" style={{ marginTop: "10px", maxWidth: "100%" }} />
        )}
      </Box>
    );
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <ImageInput />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the product name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tags"
                  name="tags"
                  onChange={handleChange}
                  required
                  value={values.tags}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  required
                  value={values.price}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.price}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Add Product</Button>
        </CardActions>
      </Card>
    </form>
  );
};

const Page = () => (
  <>
    <Head>
      <title>Add Product | Kronos.AI</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Add product</Typography>
          </div>
          <div>
            <Grid xs={12} md={6} lg={8}>
              <AccountProfileDetails />
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
