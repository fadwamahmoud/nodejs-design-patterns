import { readFile } from "fs";
import { EventEmitter } from "events";
import { nextTick } from "process";

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.files = [];
    this.regex = regex;
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    nextTick(() => {
      this.emit("finding", () => console.log(this.files));
    });
    for (const file of this.files) {
      readFile(file, "utf-8", (err, data) => {
        if (err) return this.emit("error", err);
        this.emit("fileread", file);

        const matches = data.match(this.regex);
        if (matches) {
          for (const match of matches) {
            this.emit("found", file, match);
          }
        }
      });
    }
    return this;
  }
}

const findRegexInstance = new FindRegex("hello world");

findRegexInstance
  .addFile("a.txt")
  .addFile("b.txt")
  .find()
  .on("error", (err) => console.log(err))
  .on("found", (data, match) => console.log(data, match));
