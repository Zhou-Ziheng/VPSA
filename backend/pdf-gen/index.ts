const { generate } = require("@pdfme/generator");
const fs = require("fs");
const path = require("path");

const template = require("../assets/pdf-gen/template.json");

type Inputs = [{ name: string; course: string }];

const font = {
  Ethos: {
    data: fs.readFileSync(
      path.join(__dirname, "../assets/pdf-gen/Hiragino-Mincho-ProN.otf")
    ),
    fallback: true,
  },
};

export const genPDF = (inputs: Inputs) =>
  generate({
    template,
    inputs: inputs,
    options: { font },
  });
