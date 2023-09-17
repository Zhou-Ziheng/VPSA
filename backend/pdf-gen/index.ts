const { generate } = require("@pdfme/generator");
const fs = require("fs");
const path = require("path");

const template = require("./template.json");

type Inputs = [{ name: string; course: string }];

const font = {
  Ethos: {
    data: fs.readFileSync(path.join(__dirname, "Hiragino-Mincho-ProN.otf")),
    fallback: true,
  },
};

export const genPDF = (inputs: Inputs) =>
  generate({
    template,
    inputs: inputs,
    options: { font },
  });
