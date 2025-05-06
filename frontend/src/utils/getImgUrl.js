function getImgUrl(name) {
  return new URL(`../Products/assets/glasses/${name}`, import.meta.url);
}

export { getImgUrl };
