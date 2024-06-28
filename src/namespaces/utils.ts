import { ChannelType, Message } from "discord.js";
import * as app from "#app"

export function parseName(name: string) {
    const parsedName = name.replace(/[._\s]/g, "-");

    return parsedName;
}

export async function checkChannel(message: Message<true>, name: string): Promise<void | app.TextChannel> {
    const channels = await message.guild.channels.fetch()
        .then(async (channels) => {
            const exists = channels.find((channel) => channel?.name === name && channel?.type === ChannelType.GuildText) as ChannelType.GuildText | null | undefined

            if (!exists) {
                const channel = await message.guild.channels.create({
                    name: name,
                    type: ChannelType.GuildText
                })
                    .catch((e) => {

                        const err = e as app.DiscordAPIError

                        return app.createLogger.error(`${err.name} Failed to create "${name}" in "${message.guild}" (${message.guild.id})`)
                    })

                app.createLogger.success(`Created "${name}" in "${message.guild}" (${message.guild.id})`)

                return channel
            }

            else {

                app.fetchLogger.success(`Channel "${name}" already exists, returning channel...`)

                return exists
            }
        })
        .catch((e) => {

            const err = e as app.DiscordAPIError

            return app.fetchLogger.error(`${err.name} Failed to fetch channels from "${message.guild}" (${message.guild.id})`)
        })


    return channels
}

export async function postArticles(message: Message<true>, items: app.Item[]) {

    const parsedName = parseName(items[0].user?.login);

    const channel = await checkChannel(message, parsedName);

    if (!channel) {
        const err = new Error('No channel provided !')

        return app.sendLogger.error(err)
    }

    const embeds = Object.values(items).forEach(async (value) => {

        const embed = app.createItemEmbed({ item: value })

        await channel.send({ embeds: [embed] })
            .then(() => {

                return app.sendLogger.success(`Found "${value.title}" in ${value.user.login} and sent it in "${channel.name}"`)

            })
            .catch((e) => {

                const err = e as app.DiscordAPIError

                return app.sendLogger.error(`${err.name} Failed to send "${value.title}" in ${channel.name}`)

            })

    })
}