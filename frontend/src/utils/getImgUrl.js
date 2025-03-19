function getImgUrl(name) {
  return new URL(`../assets/glasses/${name}`, import.meta.url);
}

export { getImgUrl };
