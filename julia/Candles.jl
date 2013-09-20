module Candles

using Datetime

export
# types
      Candle,
# functions
      dukaCSV

type Candle
  open::Float64
  high::Float64
  low::Float64
  close::Float64
  time
end


function dukaCSV(datafile)
  # Data example
  # Time,Open,High,Low,Close,Volume
  # 22.08.2013 23:59:00.000,1.04849,1.04849,1.04847,1.04848,20.08
  data, header = readcsv(datafile, has_header=true)

  candles = Array(Candle, size(data, 1))

  for i = 1:size(data, 1)

    d = data[i,:]
    # Extract numeric data
    fd = map(float64, d[2:5])

    # Work on datatime
    dt = split(d[1]," ")
    ddate = map(int64, split(dt[1], "."))
    dtime = split(dt[2], ":")
    s = int64(split(dtime[3], ".")[1])
    dtime = map(int64, dtime[1:2])

    dtime = datetime(ddate[3], ddate[2], ddate[1], dtime[1], dtime[2], s)

    candles[i] = Candle(fd[1], fd[2], fd[3], fd[4], dtime)

  end

  return candles

end


end

