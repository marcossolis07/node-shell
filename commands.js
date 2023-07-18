const fs = require('fs');
module.exports = {
  pwd: function () {
    let pwd = process.argv.toString();
    process.stdout.write(pwd);
    process.stdout.write("\nprompt > ");
  },
  date: function () {
    let date = new Date().toString();
    process.stdout.write(date);
    process.stdout.write("\nprompt > ");
  },

  ls : function () {
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      })
      process.stdout.write("prompt > ");
    });    
  },

  echo: function (argumento) {
    let argumentos = argumento + "\n";
    process.stdout.write(argumentos.split(",").join(" "));
    process.stdout.write("\nprompt > ");
  },

  cat: function cat(arguments) {
    if (arguments.length === 0) {
      console.log("Usage: cat <filename1> <filename2> ...");
    } else {
      arguments.forEach((filename) => {
        fs.readFile(filename, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading file:", err.message);
          } else {
            console.log(`Contents of ${filename}:`);
            console.log(data);
          }
        });
      });
    }
  },

  head : function (arguments) {
    let lines = 5;
    if (arguments.length === 0) {
      console.log("Usage: head <filename> [numLines]");
    } else {
      const filename = arguments[0];
      if (arguments.length >= 2) {
        lines = parseInt(arguments[1]);
        if (isNaN(lines) || lines <= 0) {
          console.log("Invalid number of lines. Using default value (5).");
          lines = 5;
        }
      }
      fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err.message);
        } else {
          const linesToShow = data.split("\n").slice(0, lines).join("\n");
          console.log(`First ${lines} lines of ${filename}:`);
          console.log(linesToShow);
        }
      });
    }
  },

  tail: function (file) {
    file.forEach((fileName)=>{
      fs.readFile(fileName,"utf8", (err, data) => {
        if (err) {
          process.stdout.write(err);
        } else {
          const lines = data.split("\n").slice(-5);
          const firstThreeLines = lines.join("\n");
          process.stdout.write(firstThreeLines);
        }
        process.stdout.write("\nprompt > ");
      });
    })
  }
};