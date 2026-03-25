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
    const filePath = path.join(__dirname, `temp_${Date.now()}.py`);
    fs.writeFileSync(filePath, code);

    return new Promise((resolve, reject) => {
      const safeInput = input.replace(/"/g, '\\"');

      const command = `echo "${safeInput}" | docker run --rm -i -v "${filePath}:/app/code.py" python:3.10 python /app/code.py`;

      exec(command, (error, stdout, stderr) => {
        try { fs.unlinkSync(filePath); } catch (_) {}

        if (error) return reject(new Error(stderr || error.message));
        resolve(stdout);
      });
    });
  }
}

module.exports = ExecutionService;