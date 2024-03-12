import { NextApiRequest, NextApiResponse } from 'next'

const pricesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const prices = [
    {
        id: "1",
        asset: "Bitcoin",
        price: 4000
      },
      {
        id: "2",
        asset: "Ethereum",
        price: 2800
      },
      {
        id: "3",
        asset: "Tesla",
        price: 290.41
      },
      {
        id: "4",
        asset: "Gold",
        price: 1347.29
      },
      {
        id: "5",
        asset: "Apple",
        price: 278.40
      }
  ]
  
  res.status(200).json(prices)
}

export default pricesHandler
