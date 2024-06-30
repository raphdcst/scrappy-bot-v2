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

export async function postItem(channel: app.TextChannel, item: app.Item) {

    const embed = app.createItemEmbed({ item: item });

    await channel.send({ embeds: [embed] })
        .then(() => {

            return app.sendLogger.success(`Sent "${item.title}" from "${item.user.login}" dressing in "${channel.name}"`);

        })
        .catch((e) => {

            const err = e as app.DiscordAPIError;

            return app.sendLogger.error(`${err.name} Failed to send "${item.title}" in ${channel.name}`);

        })

}

export async function postUser(message: Message<true>, user: app.VintedUser, channel: app.TextChannel | app.GuildTextBasedChannel) {

    const embed = app.createUserEmbed({ user: user, message: message });

    await channel.send({ embeds: [embed] })
        .then(() => {

            return app.sendLogger.success(`Sent "${user.login}" in "${channel.name}"`);

        })
        .catch((e) => {

            const err = e as app.DiscordAPIError;

            return app.sendLogger.error(`${err.name} Failed to send "${user.login}" in ${channel.name}`);

        })

}

export async function postItems(message: Message<true>, items: app.Item[]) {

    const parsedName = parseName(items[0].user?.login);

    const channel = await checkChannel(message, parsedName);

    if (!channel) {
        const err = new Error('No channel provided !')

        return app.sendLogger.error(err)
    }

    Object.values(items).forEach(async (value) => {

        await postItem(channel, value)

    })

    if (items.length === 1) {
        return app.sendLogger.success(`Task finished : found ${items.length} item. Sending in "${channel.name}" in "${message.guild.name}" (${message.guild.id})`)
    }

    return app.sendLogger.success(`Task finished : found ${items.length} items. Sending in "${channel.name}" in "${message.guild.name}" (${message.guild.id})`)

}

export async function postUsers(message: Message<true>, users: app.VintedUser[]) {

    const channel = message.channel

    Object.values(users).slice(0, 10).forEach(async (value) => {

        await postUser(message, value, channel)

    })

    if (users.length === 1) {
        return app.sendLogger.success(`Task finished : found ${users.length} user. Sending in "${channel.name}" in "${message.guild.name}" (${message.guild.id})`)
    }

    if (users.length > 10) {
        return app.sendLogger.success(`Task finished : found ${users.length} users. Sending firsts 10 users in "${channel.name}" in "${message.guild.name}" (${message.guild.id})`)
    }

    return app.sendLogger.success(`Task finished : found ${users.length} users. Sending in "${channel.name}" in "${message.guild.name}" (${message.guild.id})`)

}