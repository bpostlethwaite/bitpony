using Candles

function getIndicators(candle, win)
  # win is window length
  # Get indicator I1 - I3 for 'open', 'high' and 'low'
  # where Popen[t] - Popen[t-1] / Popen[t-1] etc.
  # Compute indicator I4 (Popen_t - Popen_t-1) / (PH_lambda - PL_lambda)
  # Where PH_lambda is max(Phigh_i) where i is in window (t-lambda >= i > t - 1)
  OPEN = 1
  HIGH = 2
  LOW = 3
  N = size(candle.data, 1)

  indicators = diff(candle.data[:, OPEN:LOW]) ./ candle.data[1:end-1, OPEN:LOW]

  PH_win = Array(Float64, N-1)
  PL_win = Array(Float64, N-1)

  for i = 2:N
    if i <= win
      PH_win[i-1] = max(candle.data[1 : i, HIGH])
      PL_win[i-1] = min(candle.data[1 : i, LOW])
    else
      PH_win[i-1] = max(candle.data[i - win + 1 : i, HIGH])
      PL_win[i-1] = min(candle.data[i - win + 1 : i, LOW])
    end
  end

  I4 = diff(candle.data[:, OPEN]) ./ (PH_win - PL_win)

  [indicators I4]

end

datasource = "../data/forex/dukascopy/EURUSD_Candlestick_1_m_BID_20.08.2013-22.08.2013.csv"
candle = dukaCSV(datasource)

# Select range from 12 -> 14:00 UTC
# year month day hour minute second
# Setting month = 1 due to bug in Calendar!

t1 = (2013, 1, 20, 11, 59, 0)
t2 = (2013, 1, 20, 14, 01, 0)


setCandleRange!(candle, t1, t2)

window = 10
indicators = getIndicators(candle, window)


println(size(indicators))

# min = 1
# for i = 1:size(candles,1)
#   PH[i] = max(data[
# end



