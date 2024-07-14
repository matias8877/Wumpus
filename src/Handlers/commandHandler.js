async function loadCommands(client) {
  const { loadFiles } = require("../functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  const commandsArray = [];

  const Files = await loadFiles("src/commands");

  Files.forEach((file) => {
    const command = require(file);
    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

    table.addRow(command.data.name, "✅");
  });

  client.application.commands.set(commandsArray);

  console.log(table.toString(), "\nCommands Loaded.");
}

module.exports = { loadCommands };
