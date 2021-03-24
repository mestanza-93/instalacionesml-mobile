const MakeUrl = (type: string, id: string = "") => {
  var url = "/";

  url = url.concat(type);

  if (id) {
    url = url.concat("/", id);
  }

  return url;
};

export default { MakeUrl };
