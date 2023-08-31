import figlet from "figlet";
import { sleep } from "./helpers.js";

export default function showBanner(text, duration, font = "Standard") {
  figlet(
    text,
    {
      font,
      whitespaceBreak: true,
    },
    function (error, data) {
      if (error) {
        console.error("Something went wrong...");
        console.dir(error);
        return;
      }

      console.log(data);
    }
  );

  return sleep(duration);
}
