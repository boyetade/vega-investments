import { NextApiRequest, NextApiResponse } from 'next';

interface Position {
    id: number;
    asset: string;
    quantity: number;
    price: number;
}

interface PortfolioEntry {
    id: string;
    asOf: string;
    positions: Position[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]} ${year}`;
};

const portfoliosHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const portfolios: PortfolioEntry[] = [
    
      {
        "id": "1",
        "asOf": "2020-01-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 10, "price": 4000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 5, "price": 2800.00 },
          { "id": 3, "asset": "Tesla", "quantity": 1000, "price": 290.41 },
          { "id": 4, "asset": "Gold", "quantity": 10, "price": 1347.29 },
          { "id": 5, "asset": "Apple", "quantity": 100, "price": 290.32 }
        ]
      },
      {
        "id": "2",
        "asOf": "2020-04-15",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 12, "price": 2800.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 7, "price": 1400.00 },
          { "id": 3, "asset": "Tesla", "quantity": 1100, "price": 10.41 },
          { "id": 4, "asset": "Gold", "quantity": 15, "price": 1100.29 },
          { "id": 5, "asset": "Apple", "quantity": 120, "price": 280.74 }
        ]
      },
      {
        "id": "3",
        "asOf": "2020-07-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 15, "price": 8000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 10, "price": 2200.00 },
          { "id": 3, "asset": "Tesla", "quantity": 1200, "price": 270.41 },
          { "id": 4, "asset": "Gold", "quantity": 20, "price": 1400.29 },
          { "id": 5, "asset": "Apple", "quantity": 140, "price": 290.28 }
        ]
      },
      {
        "id": "4",
        "asOf": "2020-10-15",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 18, "price": 10000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 12, "price": 2600.00 },
          { "id": 3, "asset": "Tesla", "quantity": 1300, "price": 300.41 },
          { "id": 4, "asset": "Gold", "quantity": 25, "price": 1500.29 },
          { "id": 5, "asset": "Apple", "quantity": 160, "price": 320.41 }
        ]
      },
      {
        "id": "5",
        "asOf": "2021-01-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 20, "price": 12000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 15, "price": 2800.00 },
          { "id": 3, "asset": "Tesla", "quantity": 1500, "price": 350.41 },
          { "id": 4, "asset": "Gold", "quantity": 30, "price": 1600.29 },
          { "id": 5, "asset": "Apple", "quantity": 180, "price": 297.75 }
        ]
      },
      {
        "id": "6",
        "asOf": "2021-04-15",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 25, "price": 12000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 20, "price": 3200.00 },
          { "id": 3, "asset": "Tesla", "quantity": 1800, "price": 300.41 },
          { "id": 4, "asset": "Gold", "quantity": 35, "price": 1700.29 },
          { "id": 5, "asset": "Apple", "quantity": 200, "price": 290.40 }
        ]
      },
      {
        "id": "7",
        "asOf": "2021-07-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 28, "price": 17000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 25, "price": 3500.00 },
          { "id": 3, "asset": "Tesla", "quantity": 2000, "price": 450.41 },
          { "id": 4, "asset": "Gold", "quantity": 40, "price": 1800.29 },
          { "id": 5, "asset": "Apple", "quantity": 220, "price": 348.77 }
        ]
      },
      {
        "id": "8",
        "asOf": "2021-10-15",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 30, "price": 10000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 30, "price": 3800.00 },
          { "id": 3, "asset": "Tesla", "quantity": 2200, "price": 500.41 },
          { "id": 4, "asset": "Gold", "quantity": 45, "price": 1000.29 },
          { "id": 5, "asset": "Apple", "quantity": 250, "price": 142.10 }
        ]
      },
      {
        "id": "9",
        "asOf": "2022-01-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 32, "price": 20000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 35, "price": 4200.00 },
          { "id": 3, "asset": "Tesla", "quantity": 2500, "price": 550.41 },
          { "id": 4, "asset": "Gold", "quantity": 50, "price": 2000.29 },
          { "id": 5, "asset": "Apple", "quantity": 280, "price": 150.56 }
        ]
      },
      {
        "id": "10",
        "asOf": "2022-03-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 35, "price": 22000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 40, "price": 4500.00 },
          { "id": 3, "asset": "Tesla", "quantity": 2800, "price": 600.41 },
          { "id": 4, "asset": "Gold", "quantity": 55, "price": 2100.29 },
          { "id": 5, "asset": "Apple", "quantity": 300, "price": 165.78 }
        ]
      },
      {
        "id": "11",
        "asOf": "2022-7-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 37, "price": 25000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 42, "price": 4800.00 },
          { "id": 3, "asset": "Tesla", "quantity": 2900, "price": 650.41 },
          { "id": 4, "asset": "Gold", "quantity": 58, "price": 2300.29 },
          { "id": 5, "asset": "Apple", "quantity": 320, "price": 175.78 }
        ]
      },
      {
        "id": "12",
        "asOf": "2022-10-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 43, "price": 25000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 50, "price": 4700.00 },
          { "id": 3, "asset": "Tesla", "quantity": 3100, "price": 630.41 },
          { "id": 4, "asset": "Gold", "quantity": 69, "price": 2500.29 },
          { "id": 5, "asset": "Apple", "quantity": 350, "price": 185.78 }
        ]
      },
      {
        "id": "13",
        "asOf": "2023-02-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 46, "price": 27000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 55, "price": 4900.00 },
          { "id": 3, "asset": "Tesla", "quantity": 3300, "price": 670.41 },
          { "id": 4, "asset": "Gold", "quantity": 73, "price": 2700.29 },
          { "id": 5, "asset": "Apple", "quantity": 370, "price": 205.78 }
        ]
      },
      {
        "id": "14",
        "asOf": "2023-08-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 50, "price": 29000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 58, "price": 5100.00 },
          { "id": 3, "asset": "Tesla", "quantity": 3500, "price": 690.41 },
          { "id": 4, "asset": "Gold", "quantity": 77, "price": 2900.29 },
          { "id": 5, "asset": "Apple", "quantity": 390, "price": 235.78 }
        ]
      },
      {
        "id": "15",
        "asOf": "2023-08-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 55, "price": 31000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 61, "price":4700.00 },
          { "id": 3, "asset": "Tesla", "quantity": 3700, "price": 700.41 },
          { "id": 4, "asset": "Gold", "quantity": 80, "price": 2700.29 },
          { "id": 5, "asset": "Apple", "quantity": 410, "price": 185.78 }
        ]
      },
      {
        "id": "16",
        "asOf": "2023-12-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 58, "price": 29000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 61, "price":4400.00 },
          { "id": 3, "asset": "Tesla", "quantity": 3700, "price": 900.41 },
          { "id": 4, "asset": "Gold", "quantity": 80, "price": 2900.29 },
          { "id": 5, "asset": "Apple", "quantity": 410, "price": 200.78 }
        ]
      },
      {
        "id": "17",
        "asOf": "2024-02-01",
        "positions": [
          { "id": 1, "asset": "Bitcoin", "quantity": 58, "price": 31000.00 },
          { "id": 2, "asset": "Ethereum", "quantity": 61, "price":4200.00 },
          { "id": 3, "asset": "Tesla", "quantity": 3700, "price": 870.41 },
          { "id": 4, "asset": "Gold", "quantity": 80, "price": 2700.29 },
          { "id": 5, "asset": "Apple", "quantity": 410, "price": 190.78 }
        ]
      },
    ]
    
    
    // Extract date labels from the portfolios
    const labels = portfolios.map(entry => formatDate(entry.asOf));
    const p = portfolios.map((position: any) => position.positions);
    const d = p.map(f => f.price);
    const totalValues: number[] = [];
    portfolios.forEach(portfolio => {
        let totalValue = 0;
        portfolio.positions.forEach(position => {
            totalValue += position.price * position.quantity;
        });
        totalValues.push(totalValue);
    });
    
    res.status(200).json({ labels, portfolios, totalValues });
};

export default portfoliosHandler;





