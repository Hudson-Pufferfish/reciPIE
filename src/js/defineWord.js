defiEl = document.querySelector('.definition')

export default getDefi = async function (word){
  try{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json().then(function(result){
      const [obj0] = result;
      const meanings = obj0.meanings;
      const firstMeaning = meanings[0];
      const definitions = firstMeaning.definitions;
      const firstDefinition = definitions[0];
      const definiti = firstDefinition.definition;
      defiEl.innerText = `${word}: ${definiti}`;
      return definiti;
    });
  } catch (err) {
    console.log(err);
  }
};
