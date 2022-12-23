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

  const responseData = {
    status: "ok",
    totalResults: 20,
    articles: [
      {
        source: { id: null, name: "India.com" },
        author: "Devadyuti Das",
        title:
          "IPL 2023: BCCI announce BIG rule change, IMPACT Players restricted to THIS - Zee News",
        description:
          "The Indian Premier League (IPL) are set to introduce a big change for the upcoming 2023 season which is expected to get underway around April next year.",
        url: "https://zeenews.india.com/cricket/ipl-2023-bcci-announce-big-rule-change-impact-players-restricted-to-this-2546214.html",
        urlToImage:
          "https://english.cdn.zeenews.com/sites/default/files/2022/12/09/1127270-iplimpact.jpg",
        publishedAt: "2022-12-09T02:41:27Z",
        content:
          "The Indian Premier League (IPL) are set to introduce a big change for the upcoming 2023 season which is expected to get underway around April next year. IPL 2023 is set to witness the introduction of… [+2359 chars]",
      },
      {
        source: { id: null, name: "Hindustan Times" },
        author: "HT Sports Desk",
        title:
          "‘He’s a man on a mission': Dinesh Karthik picks next Virat Kohli of Team India - Hindustan Times",
        description:
          "Indian wicketkeeper-batter Dinesh Karthik also opined that skipper Rohit Sharma has gained massive respect as a leader for batting in injury. Virat Kohli-starrer Team India was upstaged by Bangladesh in the 2nd ODI by 5 runs on Wednesday. | Cricket",
        url: "https://www.hindustantimes.com/cricket/dinesh-karthik-wants-shreyas-iyer-to-be-the-next-virat-kohli-and-finish-games-for-india-101670534092328.html",
        urlToImage:
          "https://images.hindustantimes.com/img/2022/12/08/1600x900/Collage_Maker-09-Dec-2022-0334-AM_1670537130161_1670537130323_1670537130323.jpg",
        publishedAt: "2022-12-09T02:10:17Z",
        content:
          "Rohit Sharma and Shreyas Iyer staged India's remarkable comeback with their batting heroics although Bangladesh dashed the hopes of the visitors by clinching the final-over thriller at the Shere Bang… [+2949 chars]",
      },
      {
        source: { id: null, name: "Barca Blaugranes" },
        author: "Josh Suttr",
        title:
          "Endrick’s price tag will push Barcelona to Moukoko - report - Barca Blaugranes",
        description: "The Dortmund teenager is out of contract in the summer",
        url: "https://www.barcablaugranes.com/2022/12/8/23499794/endricks-price-tag-will-push-barcelona-to-moukoko-report",
        urlToImage:
          "https://cdn.vox-cdn.com/thumbor/ED0ZzJf17eIqCEb7tkLPmg_wucY=/0x0:4948x2591/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24275616/1245023020.jpg",
        publishedAt: "2022-12-08T18:00:00Z",
        content:
          "Barcelona continue to be linked with a host of players ahead of the January transfer window and beyond. They have a number of targets theyre considering, but as usual, money is the defining detail fo… [+861 chars]",
      },
      {
        source: { id: null, name: "India TV News" },
        author: "Written by Kartik Mehindru",
        title:
          "Suryakumar Yadav vs Rishabh Pant vs Shreyas Iyer: Who will be India's number 4 at World Cup 2023? - India TV News",
        description:
          "Suryakumar Yadav vs Rishabh Pant vs Shreyas Iyer: Who will be India's number 4 at World Cup 2023?",
        url: "https://www.indiatvnews.com/sports/cricket/suryakumar-yadav-vs-rishabh-pant-vs-shreyas-iyer-who-will-be-india-s-number-4-at-odi-world-cup-2023-2022-12-08-829789",
        urlToImage:
          "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/12/untitled-design-8-1670522139.jpg",
        publishedAt: "2022-12-08T17:59:51Z",
        content:
          "Well, it's that time of the season again in Indian cricket. The ODI World Cup next year will be the talk of the town and grab all the headlines, and there might be one that has continued right from t… [+2023 chars]",
      },
      {
        source: { id: "espn-cric-info", name: "ESPN Cric Info" },
        author: "ESPNcricinfo staff",
        title:
          "Ravindra Jadeja, Mohammed Shami likely to miss Bangladesh Test series - ESPNcricinfo",
        description:
          "The uncapped Saurabh Kumar and Navdeep Saini are likely to be drafted into the Test squad as replacement players",
        url: "https://www.espncricinfo.com/story/ban-vs-india-2022-1st-test-ravindra-jadeja-mohammed-shami-likely-to-miss-bangladesh-test-series-1348679",
        urlToImage:
          "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/345400/345482.6.jpg",
        publishedAt: "2022-12-08T17:33:17Z",
        content:
          "UP's Saurabh Kumar could be in line for his Test debut, in place of Ravindra Jadeja  •  Bangladesh Cricket Board",
      },
      {
        source: { id: null, name: "India TV News" },
        author: "Edited by Kartik Mehindru",
        title:
          "Argentina vs Netherlands and Lionel Messi's potential last dance: Are you ready for Quarterfinals? - India TV News",
        description:
          "Argentina vs Netherlands and Lionel Messi's potential last dance: Are you ready for the Quarterfinals of FIFA World Cup 2022",
        url: "https://www.indiatvnews.com/sports/football/argentina-vs-netherlands-and-lionel-messi-s-potential-last-dance-are-you-ready-for-the-quarterfinals-of-fifa-world-cup-2022-2022-12-08-829777",
        urlToImage:
          "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/12/16705179411033734_wcup_argentina_soccer_32239.jpg",
        publishedAt: "2022-12-08T17:20:42Z",
        content:
          "When Argentina and Netherlands take the field on Friday, it might just be Messi's last dance on the biggest football platform in the world. \r\nWell, let that sink in.\r\nMessi &amp; The Road To The Fina… [+3822 chars]",
      },
      {
        source: { id: "espn-cric-info", name: "ESPN Cric Info" },
        author: "Andrew McGlashan",
        title: "Head's love affair with Adelaide continues - ESPNcricinfo",
        description:
          "He has been prolific, scoring 570 runs in his last six Tests in Australia, and hit another high in front of his home crowd",
        url: "https://www.espncricinfo.com/story/aus-vs-wi-2nd-test-2022-travis-head-s-love-affair-with-adelaide-continues-1348673",
        urlToImage:
          "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/350400/350466.6.jpg",
        publishedAt: "2022-12-08T16:32:49Z",
        content:
          "NewsHe has been prolific, scoring 570 runs in his last six Tests in Australia, and hit another high in front of his home crowd",
      },
      {
        source: { id: null, name: "Manchester Evening News" },
        author: "Daniel Murphy",
        title:
          "PSG president makes transfer admission on Manchester United star Marcus Rashford - Manchester Evening News",
        description:
          "Man United striker Marcus Rashford has returned to form this season and is enjoying an excellent World Cup with England.",
        url: "https://www.manchestereveningnews.co.uk/sport/football/transfer-news/manchester-united-transfers-rashford-psg-25706792",
        urlToImage:
          "https://i2-prod.manchestereveningnews.co.uk/sport/football/football-news/article25706769.ece/ALTERNATES/s1200/0_psgPNG.png",
        publishedAt: "2022-12-08T15:35:57Z",
        content:
          "Paris Saint-Germain president Nasser Al-Khelaifi has admitted his club has been interested in Marcus Rashford before and could be again next year.\r\n The Manchester United star has returned to his bes… [+1849 chars]",
      },
      {
        source: { id: null, name: "India.com" },
        author: "Piyush Singh Thapa",
        title:
          "Did Cristiano Ronaldo threaten to leave Portugal team? FPF breaks silence on superstar`s controversy with c... - Zee News",
        description:
          "“You know the first thing Ronaldo did when he found out he wouldn’t start? He went to speak to Goncalo and the rest of the team to encourage them.",
        url: "https://zeenews.india.com/football/did-cristiano-ronaldo-threaten-to-leave-portugal-team-fpf-breaks-silence-on-superstars-controversy-with-coach-fernando-santos-fifa-world-cup-2022-2546134.html",
        urlToImage:
          "https://english.cdn.zeenews.com/sites/default/files/2022/12/08/1127192-cr7.jpg",
        publishedAt: "2022-12-08T14:38:30Z",
        content:
          "The Portuguese Football Federation cleared the air on Cristiano Ronaldo's argument with coach Fernando Santos stating that the reports of the superstar threatening to leave the camp in Qatar are not … [+3779 chars]",
      },
      {
        source: { id: null, name: "Hindustan Times" },
        author: "HT Sports Desk",
        title:
          "Gunshots heard in Multan around 1km away from ENG team hotel: Reports - Hindustan Times",
        description:
          "According to a report, gun shots were reportedly heard in Multan on Thursday where Ben Stokes-led England side is gearing up for the 2nd Test match against hosts Pakistan. | Cricket",
        url: "https://www.hindustantimes.com/cricket/gunshots-heard-in-multan-around-1km-away-from-england-team-hotel-ahead-of-2nd-test-4-people-arrested-by-pakistan-police-report-101670505291448.html",
        urlToImage:
          "https://images.hindustantimes.com/img/2022/12/08/1600x900/CRICKET-TEST-PAK-ENG--7_1670509407783_1670509407783_1670509425380_1670509425380.JPG",
        publishedAt: "2022-12-08T14:24:31Z",
        content:
          "In a shocking turn of events, gunshots were reportedly heard in Multan on Thursday where Ben Stokes-led England side is gearing up for the 2nd Test match against hosts Pakistan. Touring the Asian nat… [+1890 chars]",
      },
      {
        source: { id: null, name: "Cricbuzz" },
        author: null,
        title:
          "Labuschagne, Head hundreds sink hamstrung West Indies | Cricbuzz.com - Cricbuzz - Cricbuzz",
        description:
          "The hosts piled on 330 runs on the opening day after opting to bat",
        url: "https://www.cricbuzz.com/cricket-news/124754/labuschagne-head-hundreds-sink-hamstrung-west-indies",
        urlToImage:
          "http://www.cricbuzz.com/a/img/v1/600x400/i1/c249821/marnus-labuschagne-and-travis.jpg",
        publishedAt: "2022-12-08T12:28:18Z",
        content:
          "Marnus Labuschagne and Travis Head put on an unbeaten 199-run stand for the fourth wicket © Getty\r\nMarnus Labuschagne and Travis Head scored imperious hundreds as Australia racked up 330 runs on the … [+3826 chars]",
      },
      {
        source: { id: null, name: "NDTV News" },
        author: "Agence France-Presse",
        title:
          "Luis Enrique Sacked By Spain After Shock Defeat To Morocco In World Cup Last 16 - NDTV Sports",
        description:
          "Spain sacked coach Luis Enrique on Thursday after the 2010 champions were dumped out of the World Cup by Morocco at the last-16 stage earlier this week",
        url: "https://sports.ndtv.com/fifa-world-cup-2022/luis-enrique-sacked-by-spain-after-shock-defeat-to-morocco-in-world-cup-last-16-3589628",
        urlToImage:
          "https://c.ndtvimg.com/2022-12/6npio84_luis-enrique-afp_625x300_08_December_22.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
        publishedAt: "2022-12-08T12:09:24Z",
        content:
          "Spain sacked coach Luis Enrique on Thursday after the 2010 champions were dumped out of the World Cup by Morocco at the last-16 stage earlier this week. Spain hammered Costa Rica 7-0 in their opening… [+1614 chars]",
      },
      {
        source: { id: null, name: "NDTV News" },
        author: "Agence France-Presse",
        title:
          "Report Says Cristiano Ronaldo Threatened To Abandon World Cup Squad After Being Benched, Now Portuga.. - NDTV Sports",
        description:
          "Cristiano Ronaldo is the most-capped Portuguese player and the top men's international goalscorer of all time",
        url: "https://sports.ndtv.com/fifa-world-cup-2022/report-says-cristiano-ronaldo-threatened-to-abandon-world-cup-squad-after-being-benched-portugal-federation-reacts-3589460",
        urlToImage:
          "https://c.ndtvimg.com/2022-12/61s6ipug_cristiano-ronaldo-afp_625x300_08_December_22.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
        publishedAt: "2022-12-08T11:53:00Z",
        content:
          "The Portuguese Football Federation (FPF) on Thursday denied Cristiano Ronaldo threatened to abandon the World Cup squad after being benched against Switzerland. The 37-year-old striker was surprising… [+1340 chars]",
      },
      {
        source: { id: "espn-cric-info", name: "ESPN Cric Info" },
        author: "Firdose Moonda",
        title:
          "Will South Africa follow England's Test template? Not quite, says van der Dussen - ESPNcricinfo",
        description:
          '"That\'s an approach that can work if the conditions are really docile like it was in Pakistan"',
        url: "https://www.espncricinfo.com/story/aus-vs-sa-2022-will-south-africa-follow-englands-test-template-not-quite-says-rassie-van-der-dussen-1348594",
        urlToImage:
          "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/344800/344837.6.jpg",
        publishedAt: "2022-12-08T11:49:20Z",
        content:
          'What kind of Test approach does Rassie van der Dussen believe in? "I prefer the cat and mouse"  •  Getty Images',
      },
      {
        source: { id: null, name: "Zoom" },
        author: "Shaunak Ghosh",
        title:
          "WATCH: Chamika Karunaratne loses 4 teeth in freak accident while taking a catch in Lanka Premier League match - Times Now",
        description:
          "While taking the catch of Nuwanidu Fernando on the Lanka Premier League, the ball fell straight into the batsman's mouth, and he was seen bleeding profusely.",
        url: "https://www.timesnownews.com/sports/cricket/watch-chamika-karunaratne-loses-4-teeth-in-freak-accident-while-taking-catch-in-lanka-premier-league-match-article-96083315",
        urlToImage:
          "https://static.tnn.in/thumb/msid-96083315,imgsize-100,width-1280,height-720,resizemode-75/96083315.jpg",
        publishedAt: "2022-12-08T11:39:48Z",
        content:
          "Lanka Premier League 2022: Full schedule, squads, match timings IST, telecast details - all you need to know",
      },
      {
        source: { id: null, name: "Cricketaddictor.com" },
        author: "www.facebook.com/derekvikas21/",
        title:
          "IPL Auction 2023 Date, Players List, Date And Time, RCB, MI, CSK, Players List With Price PDF, Date and Time - Cricket Addictor",
        description:
          "IPL Auction 2023 Date, Players List, Date And Time, RCB, MI, CSK, Players List With Price PDF, Date and Time and Channel, CSK Players List",
        url: "https://cricketaddictor.com/ipl-2023/ipl-auction-2023-date-players-list-date-and-time-rcb-mi-csk-players-list-with-price-pdf-date-and-time-and-channel-csk-players-list/",
        urlToImage:
          "https://i0.wp.com/cricketaddictor.com/wp-content/uploads/2022/05/ipl-trophy-1.jpg",
        publishedAt: "2022-12-08T11:38:51Z",
        content:
          "IPL Auction 2023 Date, Players List, Date And Time, RCB, MI, CSK, Players List With Price PDF, Date and Time and Channel, CSK Players List.\r\nIPL 2023 auction is set to take place this month and all t… [+17154 chars]",
      },
      {
        source: { id: "espn-cric-info", name: "ESPN Cric Info" },
        author: "Andrew McGlashan",
        title:
          "Hazlewood doubt for South Africa series after suffering side strain - ESPNcricinfo",
        description:
          "The fast bowler will be assessed again next week but the turnaround to Brisbane is short",
        url: "https://www.espncricinfo.com/story/josh-hazlewood-doubt-for-south-africa-series-after-suffering-side-strain-1348571",
        urlToImage:
          "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/350200/350210.6.jpg",
        publishedAt: "2022-12-08T10:57:15Z",
        content:
          "NewsThe fast bowler will be assessed again next week but the turnaround to Brisbane is short\r\nJosh Hazlewood has suffered another side strain  •  Cricket Australia via Getty Images\r\nJosh Hazlewood is… [+2467 chars]",
      },
      {
        source: { id: null, name: "International Cricket Council" },
        author: "ICC",
        title:
          "Key players return as Bangladesh name 17-member squad for first Test against India - ICC Cricket",
        description:
          "Bangladesh have named a strong squad for the first Test against India, starting 14 December, in Chattogram.",
        url: "https://www.icc-cricket.com/news/2979108",
        urlToImage:
          "https://resources.pulse.icc-cricket.com/ICC/photo/2022/12/08/1a64d8fb-ebf7-4bc6-a857-600fa20b3ec5/GettyImages-1237538945.jpg",
        publishedAt: "2022-12-08T10:55:36Z",
        content:
          "Bangladesh have named a strong squad for the first Test against India, starting 14 December, in Chattogram.Bangladesh will be bolstered by the return of wicketkeeper-batter Mushfiqur Rahim, batter Ya… [+1486 chars]",
      },
      {
        source: { id: "espn-cric-info", name: "ESPN Cric Info" },
        author: "S Sudarshanan",
        title:
          "Harmanpreet Kaur happy to be working with 'calm' Hrishikesh Kanitkar once again - ESPNcricinfo",
        description:
          '"When we came to know he would be around for the Australia series, there was a lot of positivity in the team"',
        url: "https://www.espncricinfo.com/story/ind-vs-aus-womens-t20is-india-captain-harmanpreet-kaur-happy-to-be-working-with-calm-hrishikesh-kanitkar-1348583",
        urlToImage:
          "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/343700/343773.9.jpg",
        publishedAt: "2022-12-08T10:48:00Z",
        content:
          'News"When we came to know he would be around for the Australia series, there was a lot of positivity in the team"',
      },
      {
        source: { id: null, name: "NDTV News" },
        author: null,
        title:
          '"Indian Bowling Was Third Class": Former Pakistan Star After Series Defeat To Bangladesh - NDTV Sports',
        description:
          "Former Pakistan spinner Danish Kaneria came down hard on Team India after its ODI series defeat to Bangladesh",
        url: "https://sports.ndtv.com/bangladesh-vs-india-2022-23/indian-bowling-was-third-class-former-pakistan-star-after-series-defeat-to-bangladesh-3589043",
        urlToImage:
          "https://c.ndtvimg.com/2022-12/iv247p48_team-india-afp_625x300_08_December_22.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
        publishedAt: "2022-12-08T10:09:21Z",
        content:
          "Former Pakistan spinner Danish Kaneria came down hard on Team India after its ODI series defeat to Bangladesh. Having lost the first ODI by one wicket, India failed to chase down a target of 272 in t… [+1418 chars]",
      },
    ],
  };

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
