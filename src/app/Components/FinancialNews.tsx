"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Article {
  title: string;
  url: string;
  imageUrl: string;
  language: string;
}

const FinancialNews: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://api.marketaux.com/v1/news/all?&api_token=TrhnMUpuSQEAfFoavKaT5VIOO3ofODbOJ9sd1Gzm"
        );
        //
        const data = await response.json();
        setNews(
          data.data.map((article: any) => ({
            title: article.title,
            url: article.url,
            imageUrl: article.image_url,
            language: article.language,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const customLoader = ({
    src,
    width,
  }: {
    src: string;
    width: number;
  }): string => {
    // Return the image URL directly
    return `${src}?w=${width}`;
  };

  return (
    <div className="grid min-h screen container mx-auto ">
      <div className="col-span-1 md:col-span-1 lg:col-span-1 ">
        <div className="rounded-xl shadow-lg bg-white">
          <div className="p-2 md:p-3 flex flex-col m-6">
            <h2 className="text-xl font-bold pb-2">Recent Financial News</h2>
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p>Gathering the lastest headlines,just for you!</p>
              </div>
            ) : (
              <div>
                <ul>
                  {news.map((article, index) =>
                    article.language === "en" ? (
                      <li key={index}>
                        <div className="pb-4">
                          <div className="flex items-start">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-sm pr-1"
                            >
                              {article.title}
                            </a>
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              width={70}
                              height={70}
                              loader={customLoader}
                            />
                          </div>
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialNews;
