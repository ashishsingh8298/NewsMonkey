import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import NewItem from "./NewItem";

export default function News(props) {
  const { category, apiKey, setProgress } = props;
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const updateNews = async () => {
    setLoading(true);
    setProgress(10);
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${category}")%20AND%20glocations:(%22INDIA%22)%20&api-key=${apiKey}&page=${page}`;
    let data = await fetch(url);
    setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    setProgress(70);
    setPage(page + 1);
    setArticles(parsedData.response.docs);
    setTotalResults(parsedData.response.meta.hits);
    setProgress(100);
    setLoading(false);
  };

  const capitalize = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNext = async () => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${category}")%20AND%20glocations:(%22INDIA%22)%20&api-key=${apiKey}&page=${page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setTotalResults(parsedData.response.meta.hits);

    setArticles(articles.concat(parsedData.response.docs));

    setPage(page + 1);
  };

  return (
    <>
      <h1 className="heading m-5" style={{ textAlign: "center" }}>
        Top {capitalize(category)} Headlines
      </h1>

      <Loader loading={loading} />

      <InfiniteScroll
        dataLength={articles.length}
        next={loadNext}
        hasMore={articles.length !== totalResults}
        loader={<Loader loading="true" />}
      >
        <div className="container" style={{ height: "auto" }}>
          <div className="row">
            {articles &&
              articles.map((val) => {
                return (
                  <div className="col-md-4 mb-3" key={val._id}>
                    <NewItem
                      title={val.headline.main}
                      description={val.abstract}
                      publishedAt={val.pub_date}
                      imageUrl={
                        val.multimedia.length > 0
                          ? `https://static01.nyt.com/${val.multimedia[0].url}`
                          : "https://static01.nyt.com/images/2011/01/06/business/global/06micro-span/06micro-span-jumbo.jpg?quality=75&auto=webp"
                      }
                      url={val.web_url}
                      source={val.source}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
