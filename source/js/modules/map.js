import {createElement} from "./utils";

const MAP_CONTAINER_TEMPLATE = `<div class="placement__map" id="map"></div>`;

const MapScript = document.createElement(`script`);
MapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdxiZ8JD-Awc3VOchAbkcA54-XHZJYkGY&callback=initMap`;
MapScript.defer = true;

const getCoordinates = () => {
  if (window.innerWidth < 760) {
    return {
      lat: 55.72408059371243,
      lng: 37.710367998416714,
    };
  }

  return {
    lat: 55.72408059371243,
    lng: 37.3,
  };
};

const initMap = () => {
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(document.getElementById(`map`), {
    zoom: 10,
    center: {
      lat: 55.72408059371243,
      lng: 37.710367998416714,
    },
  });

  // eslint-disable-next-line no-undef, no-unused-vars
  const marker = new google.maps.Marker({
    position: {
      lat: 55.72408059371243,
      lng: 37.710367998416714,
    },
    map,
  });

  window.addEventListener(`resize`, () => {
    map.setCenter(getCoordinates());
  });
};

const createMap = (container) => {
  container.replaceChildren(createElement(MAP_CONTAINER_TEMPLATE));

  window.initMap = initMap;

  document.head.appendChild(MapScript);
};

const init = () => {
  const mapWrapper = document.querySelector(`.placement__map-wrapper`);

  if (mapWrapper) {
    createMap(mapWrapper);
  }
};

export {
  init,
};
