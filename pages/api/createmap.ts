// Next.js API route support: https://nextjs.org/docs/api-routes/introduction  <- wow thanks vercel :)
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const endpoint = new URL(
    "create_map",
    process.env.NEXT_PUBLIC_API_URL!
  ).toString();
  console.log(endpoint);
  const response = await fetch(endpoint);
  const jsonData = await response.json();
  res.status(200).json(jsonData);
}
