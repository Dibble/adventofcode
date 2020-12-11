const fs = require('fs')

const input = fs.readFileSync("day_8/input.txt", { encoding: "utf-8" }).trim()
// const input = fs.readFileSync("day_8/example.txt", { encoding: "utf-8" }).trim()
let inputs = input.split(' ')

const getNode = (data) => {
  let numberOfChildNodes = parseInt(data[0])
  let numberOfMetaData = parseInt(data[1])
  // console.log(numberOfChildNodes, numberOfMetaData)

  if (numberOfChildNodes === 0) {
    let node = { children: [], metadata: [] }
    for (var meta = 2; meta < numberOfMetaData + 2; meta++) {
      node.metadata.push(data[meta])
    }

    return [node, data.slice(2 + numberOfMetaData)]
  }

  let node = { children: [], metadata: [] }
  let theRest = data.slice(2)
  for (var i = 0; i < numberOfChildNodes; i++) {
    let nodeResult = getNode(theRest)
    let childNode = nodeResult[0]
    let rest = nodeResult[1]

    node.children.push(childNode)
    theRest = rest
  }

  for (var i = 0; i < numberOfMetaData; i++) {
    node.metadata.push(theRest[i])
  }

  return [node, theRest.slice(numberOfMetaData)]
}

let nodes = getNode(inputs)
// let sumMeta = 0

// const sumMetadata = (node) => {
//   for (var idx in node.metadata) {
//     sumMeta += parseInt(node.metadata[idx])
//   }
//   for (var child in node.children) {
//     sumMetadata(node.children[child])
//   }
// }

// sumMetadata(nodes[0])

// console.log(sumMeta)

let sumRoot = 0

const sumMetadataOnly = (node) => {
  let sumMetaOnly = 0
  for (var idx in node.metadata) {
    sumMetaOnly += parseInt(node.metadata[idx])
  }
  // for (var child in node.children) {
  //   sumMetadata(node.children[child])
  // }
  return sumMetaOnly
}

const getNodeSum = (node) => {
  if (node.children.length === 0) return sumMetadataOnly(node)

  let nodeSum = 0
  for (var idx in node.metadata) {
    let metadataValue = parseInt(node.metadata[idx])
    if (metadataValue <= node.children.length) {
      nodeSum += getNodeSum(node.children[metadataValue - 1])
    }
  }
  return nodeSum
}

console.log(getNodeSum(nodes[0]))
