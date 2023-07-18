process.stdout.write("prompt >");

const commands = require("./commands");

process.stdin.on("data", function (data) {
  let cmd = data.toString().trim();
  let [command, ...argumento] = cmd.split(" ");

  if (commands[command]) {
    commands[command](argumento);
  } else {
    process.stdout.write("you typed: " + cmd);
    process.stdout.write("\nprompt >");
  }
});