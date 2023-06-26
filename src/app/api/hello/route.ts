import { NextApiRequest, NextApiResponse } from "next";

function handler(
  req: NextApiRequest, 
  res: NextApiResponse) {
  if (req.method === "GET") {
    res.json({ message: "Hello, World!" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export {
  handler as GET,
}




