function md5(input) {
    let hash = "";
    for (let i = 0; i < input.length; i++) {
      hash += input.charCodeAt(i).toString(16);
    }
    return hash;
  }
  