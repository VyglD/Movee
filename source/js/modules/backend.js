const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`_${response.status}: ${response.statusText}`);
  }

  return response;
};

const catchError = (err) => {
  window.console.error(err);
};

const toJSON = (response) => {
  return response.json();
};

const load = ({url = ``, method = Method.GET, body = null, headers = new Headers()} = {}) => {
  return fetch(url, {method, body, headers})
    .then(checkStatus)
    .catch(catchError);
};

const getOffers = () => {
  return load({
    url: `server/offers.json`
  })
    .then(toJSON);
};

const postCallbackForm = (data) => {
  return load({
    url: `server/callback.php`,
    method: Method.POST,
    body: data,
  })
    .then(toJSON);
};

export {
  getOffers,
  postCallbackForm,
};
