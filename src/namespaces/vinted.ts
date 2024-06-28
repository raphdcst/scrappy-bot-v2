import * as app from "#app"
import axios, { AxiosResponse } from "axios"
import randomUseragent from "random-useragent"

// Fetch the cookies from the vinted website to authenticate the requests
export async function fetchCookie(domain: string = "fr"): Promise<string | void> {
  const userAgent: string | undefined = randomUseragent.getRandom();
  if (!userAgent) {
    return app.userAgentLogger.error('Failed to generate a random user agent')
  }
  
  app.userAgentLogger.success(`Created a new random user agent : ${userAgent}`)
  
  const response: AxiosResponse = await axios.get(`https://vinted.${domain}/catalog`, {
    headers: { "user-agent": userAgent },
  });
  
  if (response.status !== 200) {
    return app.HTTPLogger.error(`HTTP error ! status: ${response.status}`)
  }

  app.HTTPLogger.success(`Server answered with ${response.status} status`)
  
  const sessionCookies = response.headers["set-cookie"];
  if (!sessionCookies) {
    return app.HTTPLogger.error(`Could not find set-cookie headers in the response`)
  }
  
  app.HTTPLogger.success(`Found set-headers cookie`)
  
  const parsedCookies: { [key: string]: string } = Object.fromEntries(
    sessionCookies.flatMap((cookieHeader) =>
      cookieHeader.split(";").map((cookie) =>
        cookie
          .trim()
          .split("=")
          .map((part) => part.trim())
      )
    )
  );

  const requiredCookies = ["anon_id", "_vinted_fr_session"];

  return requiredCookies.reduce((acc, cookie) => {
    return parsedCookies[cookie]
      ? `${acc}${cookie}=${parsedCookies[cookie]}; `
      : acc;
  }, "");
}


export async function vintedSearch(url: string, cookie: string): Promise<any |void> {
  try {
    const userAgent: string | undefined = randomUseragent.getRandom();
    if (!userAgent) {
      return app.userAgentLogger.error('Failed to generate a random user agent')
    }

    app.userAgentLogger.success(`Created a new random user agent : ${userAgent}`)

    const response: AxiosResponse = await axios.get(url, {
      headers: {
        'user-agent': userAgent,
        'Cookie': cookie,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (response.status !== 200) {
      return app.HTTPLogger.error(`HTTP error ! status: ${response.status}`)
    }

    app.HTTPLogger.success(`Server answered with ${response.status} status`)
    app.HTTPLogger.log(`Returning data...`)

    return response.data;

  } catch (e) {
    
    const err = e as Error

    return app.fetchLogger.error(`${err.name} | Failed to fetch url (${url})`)
  }
}

