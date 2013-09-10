module Duka

using Calendar


export DukaData,
       dukaCSV,
       setDukaRange!


type DukaData

  header::Array{String,1}
  data::Array{Float64,2}
  trange
  _data::Array{Float64,2}
  _trange

end

DukaData(x, y, z) = DukaData(x, y, z, y, z)

function dukaCSV(datafile)

  data, header = readcsv(datasource, has_header=true)

  tdate = [Calendar.parse("dd.mm.yyyy HH:mm:ss", date) for date = data[:,1]]

  data = data[:, 2 : 5]
  header = header[2 : 5]

  data = convert(Array{Float64,2}, data)

  DukaData(header, data, tdate)

end


function setDukaRange!(duka::DukaData, t1, t2)

  tstart = ymd_hms(t1[1], t1[2], t1[3], t1[4], t1[5], t1[6])
  tend   = ymd_hms(t2[1], t2[2], t2[3], t2[4], t2[5], t2[6])

  tind = [ (tstart < t < tend)::Bool for t = duka._trange ]

  # Chunk data into range
  duka.trange = duka._trange[tind]
  duka.data = duka._data[tind, :]

end

end

