import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import NewItem from "./NewItem";

export default function News(props) {
  const { category, apiKey, pageSize, setProgress } = props;
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const updateNews = async () => {
    setLoading(true);
    setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
    let data=await fetch(url);
    setProgress(30);
    let parsedData=await data.json();
    setProgress(70);
    setPage(page + 1);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setProgress(100);
    setLoading(false);
  };

  const capitalize = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  useEffect(() => {
    
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const loadNext = async () => {
    const url=`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

    let data=await fetch(url);
    let parsedData=await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
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
                  <div className="col-md-4 mb-3" key={val.url}>
                    <NewItem
                      title={val.title}
                      description={val.description}
                      publishedAt={val.publishedAt}
                      imageUrl={val.urlToImage}
                      url={val.url}
                      source={val.source.name}
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
