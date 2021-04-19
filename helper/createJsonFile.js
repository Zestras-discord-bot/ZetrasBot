const writeJsonFile = (name, data) => {
  const fs = require("fs");
  const path = require("path");

  // path.join(__dirname, "helper", "jsonData", `${name}.json`)

  fs.writeFile(
    `./helper/jsonData/${name}.json`,
    JSON.stringify(data),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log(`The file ${name}.json has been saved!`);
    }
  );
};

module.exports.writeJsonFile = writeJsonFile;
