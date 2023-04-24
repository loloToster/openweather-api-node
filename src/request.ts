export interface Resp {
  status: number | undefined;
  data: any;
}

const inBrowser =
  typeof window !== "undefined" && typeof window.fetch !== "undefined";
const inNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

export async function get(url: string): Promise<Resp> {
  if (inBrowser) {
    const response = await window.fetch(url);

    return {
      status: response.status,
      data: await response.json(),
    };
  } else if (inNode) {
    const getter = url.startsWith("https")
      ? await import("https")
      : await import("http");

    return await new Promise((res, rej) => {
      const request = getter.get(url, (response) => {
        let data = "";
        response.on("error", rej);
        response.on("data", (chunk) => (data += chunk.toString()));
        response.on("end", () =>
          res({
            status: response.statusCode,
            data: JSON.parse(data),
          })
        );
      });

      request.on("error", rej);
      request.end();
    });
  } else {
    throw new Error("Unknown environment");
  }
}
