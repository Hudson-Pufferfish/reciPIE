const imgDefEl = document.querySelector('.more-info__img');

export default getImgDef = async function (word) {
  try {
    const res = await fetch(`https://imsea.herokuapp.com/api/1?q=${word}`);
    const data = await res.json().then(function (result) {
      console.log(result);
      imgDefEl.alt = result.image_name ?? '';
      const img = result.results;
      imgDefEl.src = img[0];
      return img;
    });
  } catch (err) {
    console.log(err);
  }
};
