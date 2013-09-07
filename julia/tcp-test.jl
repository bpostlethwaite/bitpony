server = listen(8080)
 while true
   conn = accept(server)
   @async begin
     try
       method = read(conn, Uint8, 4)
       println("Mode is: ", utf8(method))

       numData = read(conn, Int32)
       println("numBytes is: ", numData)

       data = read(conn, Float32, numData)
       data = data * 2.

       dn = convert(Int32, length(data))
       println("transformed data length: ", dn)
       write(conn, dn)
       write(conn, data)

     catch err
       print("connection ended with error $err")
     end
   end
 end