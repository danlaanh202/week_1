import fs from "fs";
export default function (data) {
  fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data,
    })
  );
}
