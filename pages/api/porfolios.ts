import { NextApiRequest, NextApiResponse } from "next";

const portfoliosHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const portfolios = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const pastYear = 2020;
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  for (let i = 0; i < 40; i++) {
    const randomYear = Math.floor(Math.random() * (currentYear - pastYear + 1)) + pastYear;
    const randomMonth = Math.floor(Math.random() * 12); // 0-11 for month
    const randomDay = Math.floor(Math.random() * 28) + 1; // Random day, assuming all months have up to 28 days

    const randomDate = new Date(randomYear, randomMonth, randomDay);
    const asOfDate = randomDate.toISOString();

    const positions = [
      { id: 1, asset: 'Bitcoin', quantity: 10, asOf: asOfDate, price: 4000.00 },
      { id: 2, asset: 'Ethereum', quantity: 5, asOf: asOfDate, price: 2800.00 },
      { id: 3, asset: 'Tesla', quantity: 1000, asOf: asOfDate, price: 290.41 },
      { id: 4, asset: 'Gold', quantity: 10, asOf: asOfDate, price: 1347.29 },
      { id: 5, asset: 'Ethereum', quantity: 5, asOf: asOfDate, price: 278.40 }
    ];

    portfolios.push({ id: i + 1, asOf: asOfDate, positions });
  }

  res.status(200).json(portfolios);
}

export default portfoliosHandler;
