import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import { CreateNewsForm } from "./createNewsForm";
import { NewsPreview } from "./NewsPreview";

function NewsPage(): JSX.Element {
  const [createNews, setCreateNews] = useState<boolean>(false);
  const [createdSuccess, setSuccess] = useState<boolean>(false);
  const connected = getCookie("account") ? getCookie("account") : "Visiteur";
  const newsList = [{
    id: 4,
    title: "Testing tests",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer massa urna, gravida nec tortor nec, finibus cursus nibh. Donec nec dui et mauris volutpat sollicitudin. In in facilisis lorem. Vestibulum ultrices tincidunt lacus eu gravida. Phasellus eget ex nisi. Maecenas mattis at massa volutpat tempus. Praesent at ipsum eget justo scelerisque posuere id eget odio. Integer vitae neque in libero ultricies posuere sed eget nulla. Cras non dui vulputate, ultricies nunc a, consequat diam. Donec fringilla, ipsum eget rhoncus varius, sem odio malesuada nulla, sed dictum diam mi vitae urna. Curabitur non massa tristique, bibendum turpis et, vestibulum mauris. Vivamus ac risus viverra, varius nunc eget, auctor libero. Vivamus consequat sed eros id finibus.",
    author: "val",
    picture: null,
    date: "18-10-2022"
  },
  {
    id: 5,
    title: "Other tests",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer massa urna, gravida nec tortor nec, finibus cursus nibh. Donec nec dui et mauris volutpat sollicitudin. In in facilisis lorem. Vestibulum ultrices tincidunt lacus eu gravida. Phasellus eget ex nisi. Maecenas mattis at massa volutpat tempus. Praesent at ipsum eget justo scelerisque posuere id eget odio. Integer vitae neque in libero ultricies posuere sed eget nulla. Cras non dui vulputate, ultricies nunc a, consequat diam. Donec fringilla, ipsum eget rhoncus varius, sem odio malesuada nulla, sed dictum diam mi vitae urna. Curabitur non massa tristique, bibendum turpis et, vestibulum mauris. Vivamus ac risus viverra, varius nunc eget, auctor libero. Vivamus consequat sed eros id finibus.",
    author: "val",
    picture: null,
    date: "19-20-2022",
  }, {
    id: 6,
    title: "More tests",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer massa urna, gravida nec tortor nec, finibus cursus nibh. Donec nec dui et mauris volutpat sollicitudin. In in facilisis lorem. Vestibulum ultrices tincidunt lacus eu gravida. Phasellus eget ex nisi. Maecenas mattis at massa volutpat tempus. Praesent at ipsum eget justo scelerisque posuere id eget odio. Integer vitae neque in libero ultricies posuere sed eget nulla. Cras non dui vulputate, ultricies nunc a, consequat diam. Donec fringilla, ipsum eget rhoncus varius, sem odio malesuada nulla, sed dictum diam mi vitae urna. Curabitur non massa tristique, bibendum turpis et, vestibulum mauris. Vivamus ac risus viverra, varius nunc eget, auctor libero. Vivamus consequat sed eros id finibus.",
    author: "val",
    picture: null,
    date: "20-10-2022"
  }]; // fake data, need to be a api call

  function success(): void {
    setSuccess(true);
    close();
  }

  function close(): void {
    setCreateNews(false);
  }

  return (
    <div>
      {createdSuccess && <Alert>L'annonce à été créer avec succès!</Alert>}
      <p className="loginText">Vous êtes connecté en tant que {connected}</p>
      {newsList.map(news => (<NewsPreview news={news} />))}
      <Button
        variant="demeter-dark"
        onClick={() => {
          setCreateNews(true);
          setSuccess(false);
        }}
      >
        Nouvelle Annonce
      </Button>
      <CreateNewsForm show={createNews} close={close} success={success} />
    </div>
  );
}

export { NewsPage };
