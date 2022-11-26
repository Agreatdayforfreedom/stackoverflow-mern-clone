import app from "./app";
import database from "./config/database";

database();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
});
