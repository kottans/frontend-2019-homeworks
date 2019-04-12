import Unsplash, {toJson} from "unsplash-js";


export const getPhotos = async (rt) => {
  const unsplash = new Unsplash({
    applicationId: "41a9ed1fe9763d96b00cc29be8ef46fa53503793072fa87b1ce4f11b715aa8e7",
    secret: "3c09d09019489ef4ff475b3e50b1aa54e7c7c7a3dab9665de772eeb35e72c441"
  });
  const total = 100;
  let data=[];
  if(data.length < total) {
   return  await unsplash.photos.listPhotos(data.length+1, 32, "random")
        .then(toJson)
        .then(json => {
          return data =json;
        });
  }
};



