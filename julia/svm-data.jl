datasource = "../data/forex/dukascopy/EURUSD_Candlestick_1_m_BID_20.08.2013-22.08.2013.csv"

d = readcsv(datasource, has_header=true)
headers = d[2]
data = d[1] # Crop header

tdate = [Calendar.parse("dd.mm.yyyy HH:mm:ss", date) for date =  data[:,1]]
# Select data range
yr = year(tdate[1])
mn = month(tdate[1])
dy = day(tdate[1])

# Select range from 12 -> 14:00 UTC
tstart = ymd_hms(yr, mn, dy, 11, 59, 0)
tend   = ymd_hms(yr, mn, dy, 14, 1, 0)

tind = [ (tstart < t < tend)::Bool for t = tdate ]

# Chunk data into range
ts = tdate[tind]
candles = data[tind, 2:5]
headers = headers[ 2 : 5]

# Get indicator I1 - I3 for 'open', 'high' and 'low'
indicators = diff(candles[:,1:3]) ./ candles[1:end-1,1:3]

# Compute indicator I4 (Popen_t - Popen_t-1) / (PH_lambda - PL_lambda)
# Where PH_lambda is max(Phigh_i) where i is in window (t-lambda >= i > t - 1)

min = 1
for i = 1:size(candles,1)
  PH[i] = max(data[
end

I4 =
