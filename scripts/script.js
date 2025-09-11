function enterLetter(value) {
  if ((value === 'ENT') || (value === "DEL")) {
    return
  } else {
    document.getElementById('js-11').innerHTML = value;
  }
  
}
