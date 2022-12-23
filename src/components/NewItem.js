import React from "react";

export default function NewItem(props) {
  const { title, description, imageUrl, url, publishedAt, source } = props;
  return (
    <>
      <div className="card">
        <div style={{right:'2%',width:'fit-content',position:'absolute'}}>
          <i className="fas fa-envelope fa-lg"></i>
          <span className="badge rounded-pill badge-notification bg-danger">
            {source}
          </span>
        </div>

        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="my-3 text-muted small">
            {new Date(publishedAt).toUTCString()}
          </div>
          <a
            rel="noreferrer"
            href={url}
            target="_blank"
            className="btn btn-primary btn-dark btn-sm"
          >
            Read more
          </a>
        </div>
      </div>
    </>
  );
}
