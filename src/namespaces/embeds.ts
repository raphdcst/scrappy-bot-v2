import * as app from "#app"

export enum EmbedColors {
    SUCCESS = 0x14b714,
    INFO = 0x081a49,
    WARN = 0xf74100,
    ERROR = 0xc60800
}

export type EmbedColor = keyof typeof EmbedColors

export type itemEmbedOptions = {
    item: app.Item
    mesage?: app.Message
    bot?: app.ClientUser
    color?: EmbedColor
}

export type userEmbedOptions = {
    user: app.VintedUser
    message: app.Message
    bot?: app.ClientUser
    color?: EmbedColor
}

export function createItemEmbed(options: itemEmbedOptions): app.APIEmbed {

    const availability = options.item.is_closed === 0 ? ":white_check_mark:" : ":cross_mark:";

    const itemEmbed = {
        title: options.item.title,
        description: availability,
        color: EmbedColors[options?.color || 'INFO'],
        timeStamp: new Date().toISOString(),
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


export function createUserEmbed(options: userEmbedOptions): app.APIEmbed {

    const userEmbed = {
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