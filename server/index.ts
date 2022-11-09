import app from "./app";
import database from "./config/database";

database();

app.listen(process.env.PORT || 4000, () => {
  console.log("server running on port:", 4000);
});
