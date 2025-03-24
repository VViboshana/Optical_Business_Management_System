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
    const removeFields=["keyword","page","limit"];
    removeFields.forEach(key=>delete queryCopy[key]);
    this.query=this.query.find(queryCopy)
    return this
  }
}

module.exports = APIFunctionality;
