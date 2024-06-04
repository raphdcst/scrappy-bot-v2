import axios, { AxiosResponse } from "axios"
import randomUseragent from "random-useragent"

// Fetch the cookies from the vinted website to authenticate the requests
export async function fetchCookie(domain: string = "fr"): Promise<string> {
  const userAgent: string | undefined = randomUseragent.getRandom();
  if (!userAgent) {
    throw new Error("Failed to generate a random user agent");
  }

  const response: AxiosResponse = await axios.get(`https://vinted.${domain}/catalog`, {
    headers: { "user-agent": userAgent },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch cookies. Status: ${response.status}`);
  }

  const sessionCookies = response.headers["set-cookie"];
  if (!sessionCookies) {
    throw new Error("set-cookie headers not found in the response");
  }

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
