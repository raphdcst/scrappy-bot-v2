import * as app from "#app"

export default new app.Command({
  name: "find",
  description: "Find user id by providing his name",
  channelType: "guild",
  positional: [
    {
      name: "type",
      type: "string",
      description: "The type of the searched parameter (**user** or **item**)",
      required: true,
      missingErrorMessage: "Please provide the type of the searched parameter : **user** or **item** !"
    },
    {
      name: "name",
      type: "string",
      description: "The name of the searched parameter",
      required: true,
      missingErrorMessage: "Please provide the name of the searched parameter !"
    }
  ],
  async run(message) {

    const msg = message as app.Message<true>

    const type = message.args.type
    const name = message.args.name

    if (type === "user") {

      app.commandLogger.success(`Started find task with "${type}" and "${name}" as parameters`)

      return app.findUser(msg, name)

    }

    if (type === "item") {

      app.commandLogger.success(`Started find task with "${type}" and "${name}" as parameters`)

      return message.reply(`Not implemented yet ! You provided **${type}** and **${name}** as parameters`)

    }

    app.commandLogger.warn(`Could not start find task : missing parameters`)

    const errName = 'Wrong "type" provided !'
    const errDescription = "Please choose between **user** or **item**, or look at the command syntax by sending **.help find** !"


    const errorEmbed = app.createCustomErrorEmbed({ name: errName, description: errDescription })

    return message.channel.send({ embeds: [errorEmbed] })

  }
})