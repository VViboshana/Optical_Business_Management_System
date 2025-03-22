class APIFunctionality {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
  }
}

module.exports = APIFunctionality;
