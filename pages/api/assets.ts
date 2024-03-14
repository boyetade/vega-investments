import { NextApiRequest, NextApiResponse } from 'next'

const assetsHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const assets = [
    {
      id: "1",
      name: "Bitcoin",
      type: "Cryptocurrency"
    },
    {
      id: "2",
      name: "Ethereum",
      type: "Cryptocurrency"
    },
    {
      id: "3",
      name: "Tesla",
      type: "Stock"
    },
    {
      id: "4",
      name: "Gold",
      type: "Commodity"
    },
    {
      id: "5",
      name: "Apple",
      type: "Stock"
    },
    {
      id: "6",
      name: "Diamonds",
      type: "Commodity"
    },
  ]
  
  res.status(200).json(assets)
}

export default assetsHandler
