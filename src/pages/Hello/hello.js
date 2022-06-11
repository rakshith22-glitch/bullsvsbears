import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import image from "./callsputs.jpg";
import image1 from "./bullsbears.jpg";
import image2 from "./numbers.jpg";
import "./hello.css";
import { Container } from "@mui/material";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Hello() {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };
  return (
    <div class="container">
      <div class="column">
        <Card
          sx={{ maxWidth: 345 }}
          style={{
            marginTop: "5%",
            marginLeft: "5%",
            flex: 0.3,
            backgroundColor: "grey",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <CardHeader
            title="About this Website !! "
            style={{ color: "white" }}
          />
          <CardMedia component="img" height="200" image={image} />

          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded1}
              onClick={handleExpandClick1}
              aria-expanded={expanded1}
              aria-label="show more"
            >
              <ExpandMoreIcon style={{ color: "white" }} />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded1} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph style={{ color: "white" }}>
                <h3>
                  1. Gives list of Calls and Puts coming in realtime during
                  market hours. <br /> <br />
                  2. Pie Chart Shows Market Sentiment (RED : BEARISH) and
                  (GREEN: BULLISH).
                </h3>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
      <div class="column">
        <Card
          sx={{ maxWidth: 345 }}
          style={{
            marginTop: "5%",
            marginLeft: "5%",
            flex: 0.3,
            backgroundColor: "grey",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <CardHeader style={{ color: "white" }} title="Coming Soon ..." />
          <CardMedia component="img" height="200" image={image1} />

          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded2}
              onClick={handleExpandClick2}
              aria-expanded={expanded2}
              aria-label="show more"
            >
              <ExpandMoreIcon style={{ color: "white" }} />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded2} timeout="auto" unmountOnExit>
            <CardContent style={{ color: "white" }}>
              <Typography paragraph>
                <h3>
                  1.Email alert service for Golden Options
                  <br />
                  2. User Authentication <br />
                  3. Free Subscription <br /> 4. Discord
                </h3>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
      <div class="column">
        <Card
          sx={{ maxWidth: 345 }}
          style={{
            marginTop: "5%",
            marginLeft: "5%",
            flex: 0.3,
            backgroundColor: "grey",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <CardHeader title="Future Ideas" style={{ color: "white" }} />
          <CardMedia component="img" height="200" image={image2} />

          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded3}
              onClick={handleExpandClick3}
              aria-expanded={expanded3}
              aria-label="show more"
            >
              <ExpandMoreIcon style={{ color: "white" }} />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded3} timeout="auto" unmountOnExit>
            <CardContent style={{ color: "white" }}>
              <Typography paragraph>
                1. Gives alerts on Calls and Puts coming in realtime during
                market hours. <br /> <br />
                2. Pie Chart Shows Market Sentiment (RED : BEARISH) and (GREEN:
                BULLISH).
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default Hello;
