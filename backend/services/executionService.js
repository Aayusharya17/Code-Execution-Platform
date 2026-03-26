// ExecutionService.js
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const File = require("../models/File");

class ExecutionService {
  async run(fileId, userId, input = "") {
    const file = await File.findById(fileId).populate("project");
    console.log(file);

    if (!file) throw new Error("File not found");

    if (file.project.user.toString() !== userId) {
      throw new Error("Unauthorized");
    }

    const code = file.content;
    const filePath = path.join(__dirname, `temp_${Date.now()}.${file.language}`);
    fs.writeFileSync(filePath, code);

    return new Promise((resolve, reject) => {
      const safeInput = input.replace(/"/g, '\\"');
      let command = "";


        if (file.language === "python") {
          command = `echo "${safeInput}" | docker run --rm -i -v "${filePath}:/app/code.py" python:3.10 python /app/code.py`;
        }

        else if (file.language === "javascript") {
          command = `echo "${safeInput}" | docker run --rm -i -v "${filePath}:/app/code.js" node:16 node /app/code.js`;
        }

        else if (file.language === "cpp") {
          command = `echo "${safeInput}" | docker run --rm -i -v "${filePath}:/app/code.cpp" gcc:11 sh -c "g++ /app/code.cpp -o /app/a.out && /app/a.out"`;
        }

        else if (file.language === "c") {
          command = `echo "${safeInput}" | docker run --rm -i -v "${filePath}:/app/code.c" gcc:11 sh -c "gcc /app/code.c -o /app/a.out && /app/a.out"`;
        }

      exec(command, (error, stdout, stderr) => {
        try { fs.unlinkSync(filePath); } catch (_) {}

        if (error) return reject(new Error(stderr || error.message));
        resolve(stdout);
      });
    });
  }
}

module.exports = ExecutionService;