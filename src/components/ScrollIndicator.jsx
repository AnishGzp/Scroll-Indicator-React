import { useEffect, useState } from "react";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }

  function handleScrollPercentage() {
    const totalScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((totalScrolled / scrollHeight) * 100);
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <i className="fa-solid fa-gear"></i>
        </div>
      </div>
    );
  }

  if (errorMessage !== "") {
    <div className="loading-container">
      <div className="loading">
        <i className="fa-solid fa-gear"></i>
        <p>There is some error. Please try again later</p>
      </div>
    </div>;
  }

  return (
    <div className="container">
      <h2>Scroll Indicator</h2>
      <div className="scroll-progress-tracking-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>
      <div className="content">
        {data && data.length > 0
          ? data.map((dataItem) => (
              <div className="card">
                <img src={dataItem.thumbnail} alt={dataItem.title} />
                <p>{dataItem.title}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
