function importAll(r) {
  const images = {};
  r.keys().map((item) => {
    const newItem = item.replace('.jpg', '');
    images[newItem.replace('./', '')] = r(item);
    return images;
  });
  return images;
}

const images = importAll(require.context('../img/', false, /\.jpg$/));

export default images;
