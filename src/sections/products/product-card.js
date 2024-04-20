import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import Link from "next/link";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from "@mui/material";

export const ProductCard = (props) => {
  const { product } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            sx={{
              width: "100%",
              height: "auto",
            }}
            src={product.logo}
            variant="square"
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography align="left" variant="body1">
          Price: $ {product.price}
        </Typography>
        <Typography align="left" variant="body1">
          Recommended Price: $ {product.recommended_price}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack alignItems="center" direction="row" justifyContent="center" spacing={2} sx={{ p: 2 }}>
        <Link href={`${product.id}`}>
          <Button variant="outlined" size="small">
            See Product
          </Button>
        </Link>
      </Stack>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
