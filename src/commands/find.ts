import * as app from "#app"

export default new app.Command({
  name: "find",
  description: "Find user id by providing his name",
  channelType: "guild",
  positional: [
    {
      name: "user",
      type: "string",
      description: "The name of the user",
      required: true,
      missingErrorMessage: "Please provide the name of the wanted user !"
    }
  ],
  async run(message) {

    const msg = message as app.Message<true>

    const name = message.args.user

    await message.reply(`Searching for **${name}** in the Vinted database...`)

    return app.findUser(msg, name)

  }
})