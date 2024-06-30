import * as app from "#app"

export enum EmbedColors {
    SUCCESS = 0x14b714,
    INFO = 0x081a49,
    WARN = 0xf74100,
    ERROR = 0xc60800
}

export type EmbedColor = keyof typeof EmbedColors

export type ItemEmbedOptions = {
    item: app.Item
    mesage?: app.Message
    bot?: app.ClientUser
    color?: EmbedColor
}

export type UserEmbedOptions = {
    user: app.VintedUser
    message: app.Message
    bot?: app.ClientUser
    color?: EmbedColor
}

export type SmallEmbedOptions = {
    description: string
    bot?: app.ClientUser
    color?: EmbedColor
}

export type ErrorEmbedOptions = {
    err: Error
    bot?: app.ClientUser
    color?: EmbedColor
}

export type CustomErrorEmbedOptions = {
    name: string,
    description: string
    bot?: app.ClientUser
    color?: EmbedColor
}


export function createSmallEmbed(options: SmallEmbedOptions): app.APIEmbed {

    const smallEmbed: app.APIEmbed = {
        color: EmbedColors[options?.color || 'INFO'],
        description: options.description,
        timestamp: new Date().toISOString(),
        footer: {
            text: options.bot?.username || '',
            icon_url: options.bot?.avatarURL() || undefined
        }
    }

    return smallEmbed
}

export function createErrorEmbed(options: ErrorEmbedOptions): app.APIEmbed {

    const cancelEmbed: app.APIEmbed = {
        color: EmbedColors[options?.color || 'ERROR'],
        title: 'Something went wrong, cancelling !',
        description: 'Error description below',
        timestamp: new Date().toISOString(),
        fields: [
            {
                name: 'Name',
                value: options.err.name
            },
            {
                name: 'Message',
                value: options.err.message
            },
        ],
        footer: {
            text: options.bot?.username || '',
            icon_url: options.bot?.avatarURL() || undefined
        },
    }

    return cancelEmbed
}

export function createCustomErrorEmbed(options: CustomErrorEmbedOptions): app.APIEmbed {

    const customCancelEmbed: app.APIEmbed = {
        color: EmbedColors[options?.color || 'ERROR'],
        author: {
            name: `❌ ${options.name}`
        },
        description: options.description,
        timestamp: new Date().toISOString(),
        footer: {
            text: options.bot?.username || '',
            icon_url: options.bot?.avatarURL() || undefined
        },
    }

    return customCancelEmbed
}

export function createItemEmbed(options: ItemEmbedOptions): app.APIEmbed {

    const availability = options.item.is_closed === 0 ? ":white_check_mark:" : ":cross_mark:";

    const itemEmbed: app.APIEmbed = {
        title: options.item.title,
        description: availability,
        color: EmbedColors[options?.color || 'INFO'],
        timestamp: new Date().toISOString(),
        fields: [
            {
                name: " ",
                value: `Prix : **${options.item.price.amount}** ${options.item.price.currency_code}`,
                inline: true,
            },
            {
                name: " ",
                value: `Taille : **${options.item.size}**`,
                inline: true,
            },
            {
                name: " ",
                value: `Marque : **${options.item.brand}**`,
                inline: true,
            },
        ],
        footer: {
            text: options.item.user?.login,
            icon_url: options.item.user?.photo?.thumbnails[4]?.url,
        },
        image: {
            url: options.item.photos[0]?.url,
        },
        url: options.item.url,
    };


    return itemEmbed
}


export function createUserEmbed(options: UserEmbedOptions): app.APIEmbed {

    const userEmbed: app.APIEmbed = {
        title: `User founded : **${options.user.login}**`,
        description: app.codeBlock(`${options.user.id}`),
        color: EmbedColors[options?.color || 'INFO'],
        timestamp: new Date().toISOString(),
        thumbnail: {
            url: options.user.photo?.thumbnails[3]?.url,
        },
        footer: {
            text: options.message.author.username,
            icon_url: options.message.author.avatarURL() || undefined,
        },
    };

    return userEmbed
}