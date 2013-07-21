

function reconnect (stream, main) {

  /*
   * Hook into GOX stream reconnect
   * Setup reconnect
   */
  stream.on("reconnect", function (newstream) {
    reconnect(newstream, main)
  })


  /*
   * Run user logic
   */
  main(stream)


  return stream
}

module.exports = reconnect