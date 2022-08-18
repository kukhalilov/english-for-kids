function importAll(r) {
  const audios = {};
  r.keys().map((item) => {
    const newItem = item.replace('.mp3', '');
    audios[newItem.replace('./', '')] = r(item);
    return audios;
  });
  return audios;
}

const audios = importAll(require.context('../audio/', false, /\.mp3$/));

export default audios;
