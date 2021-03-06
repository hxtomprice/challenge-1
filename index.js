/*
 * createPermutations accepts an array of objects with a key attribute and values attribute.
 * @param `input` - an array of objects with `key` and `values` attibutes
 * @return all possible permutations of objects from `key => value` pairs
 */
const createPermutations = (inputs) => {
  return solveRecursively(inputs)
}

const solveIteratively = (inputs) => {
  return inputs.reduce((runningTotal, currentInput) => appendPermutations(currentInput.key, currentInput.values, runningTotal), [])
}

/*
 * appendPermutations accepts a current input lines key and values and will add these to an existing list of permutations
 * @param `key` the key of the current input iteration
 * @param `values` the values array for the current input iteration
 * @return The array of permutations created by combining the current row with the running total
 */
const appendPermutations = (key, values, runningTotal) => {
  if (!runningTotal.length) {
    return values.reduce((acc, curr) => {
      return [...acc, { [key]: curr }]
    }, [])
  }

  const updated = []
  values.forEach(v => {
    runningTotal.forEach(r => {
      updated.push({ ...r, [key]: v })
    })
  })
  return updated
}

const solveRecursively = (inputs) => {
  if (!inputs.length) return []

  const inputClone = [...inputs]
  const thisRow = inputClone.pop()
  const subPermutations = solveRecursively(inputClone)

  return thisRow.values.reduce((runningTotal, value) => {
    if (!subPermutations.length) return [ ...runningTotal, { [thisRow.key]: value } ]

    return [ ...runningTotal, ...subPermutations.map(permutation => {
      return { ...permutation, [thisRow.key]: value }
    }) ]
  }, [])
}

module.exports = createPermutations
