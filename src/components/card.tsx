import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const getImage = (id: number | undefined) => {
  let image =
    "https://static.vecteezy.com/system/resources/previews/000/566/937/original/vector-person-icon.jpg";
  switch (id) {
    case 1:
      image =
        "https://cdn.icon-icons.com/icons2/2717/PNG/512/number_circle_one_icon_173687.png";
      break;
    case 2:
      image = "https://cdn-icons-png.flaticon.com/512/3841/3841714.png";
      break;
    case 3:
      image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTspeIugJ46mE7uyfUpi9rpaCajwDHiBeFeqw&usqp=CAU";
      break;
  }
  return image;
};
export default function MediaCard({
  id,
  name,
  document,
  podium,
}: {
  id?: string;
  name?: string;
  document?: string;
  podium?: number;
}) {
  return (
    <Card
      sx={{ maxWidth: 350, minWidth: 350 }}
      style={{
        margin: "12px",
        borderRadius: "8px",
        border: "2px solid #ECEFF2",
        marginBottom: "24px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",

        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{
          height: 100,
          width: 100,
          padding: "24px",
          objectFit: "cover",
          marginBottom: "24px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        image={getImage(podium)}
        title="alcaldia"
      />
      <CardContent
        sx={{
          borderTop: "2px solid #ECEFF2",
          background: "#07892F",
          color: "#fff",
        }}
      >
        <h4>{name}</h4>
      </CardContent>
    </Card>
  );
}
