const randomIntFromInterval = () => {
    return Math.floor(Math.random() * 1001);
  };

const getRandom = (quantity) => {
    const result = {}
    for (let i = 0; i < quantity; i++) {
      const random = randomIntFromInterval();
      result[random] = result[random] ? result[random] + 1 : 1;
    }
    return result;
}

process.on('message', (quantity) => {
    const result = getRandom(quantity);
    process.send(result);
})