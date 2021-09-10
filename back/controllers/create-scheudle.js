const formsRepository = require("../repositories/forms-repository");

async function createScheudle(req, res) {
  const { clientId,
  firstQ,
  secondQ,
  thirdQ,
  fourthQ,
  fifthQ,
  sixthQ,
  seventhQ } = req.body;
  const addedScheudle = await formsRepository.create(
    clientId,
    firstQ,
    secondQ,
    thirdQ,
    fourthQ,
    fifthQ,
    sixthQ,
    seventhQ
  )

  res.status(201).send({ addedScheudle });
}

module.exports = createScheudle;