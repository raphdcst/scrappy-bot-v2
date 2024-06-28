import * as app from "#app"

export default new app.Command({
  name: "dressing",
  description: "Check dressing",
  channelType: "guild",
  positional: [
    {
      name: "id",
      type: "string",
      description: "The id of the dresing checked user",
      required: true,
      missingErrorMessage: "Please provide the user id of the wanted dressing !"
    },
    
  ],
  async run(message) {

    const msg = message as app.Message<true>

    const id = message.args.id

    return app.fetchDressing(msg, id)
  }
})