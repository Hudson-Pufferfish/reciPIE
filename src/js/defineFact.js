export default getFactDef = async function (numb) {
  const factEl = document.querySelector('.more-info__fact');
  try {
    const res = await fetch(`http://numbersapi.com/${numb}/trivia`);
    let factText = await res.text();
    factEl.innerText = factText;
    return factText;
  } catch (err) {
    console.log('Fetch failed', err);
  }
};
