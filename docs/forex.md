# Forex market prediction

## Forex Trading
- Busiest trades during London Newyork overlap - 1pm -> 5pm UTC
- Busiest days of week are Tues->Thurs



## Forex Data
- Historical from [Dukascopy](http://www.dukascopy.com/swiss/english/marketwatch/historical/)

## Trading Strategies
### Risk Management
- Stop-Loss
  - A stop-loss order is a type of order linked to a trade for the purpose of preventing additional losses if price goes against you


## Modeling

### Pseudo MultiClass vs MultiClass
- One way to get multiclass for say -> hold, sell, hard-sell and buy and hard buy would be to run 4 single class SVMs for 4 SVM with classification set to sell, hard-sell, buy and hard-buy levels. Sum classes for 4 models to get 5 unique values tied to hold, sell, hard-sell and buy and hard buy, where the dividing lines would require optimization and be based on transaction fees:

Example
```
  Class            SVM Models
----------hardbuy  buy   sell  hardsell  Total  Recommendation
|  C*fee |   1      1      1      1        4       hard-buy
|   fee  |  -1      1      1      1        2       buy
|-fee<fee|  -1     -1      1      1        0       hold
|  -fee  |  -1     -1     -1      1       -2       sell
| -C*fee |  -1     -1     -1     -1       -4       hard-sell
----------
`

Another way is just to use the built in LIBSVM functionality for multiclass.

**TEST BOTH**

This adjustable multiclass logic might enhance trading logic.
Easy to create as builing dataset. Just classify all 4 in the
single pass through data. Could run all 4 in parallel on 4 CPUs


### Support Vector Machine Indicators
#### Price signals
- Price Ratios (see masters thesis in GDrive)
- Direct Price
- Price signals from other currency pairs (test adding different combos)
- Resource Prices? Oil -> USD/CAN

#### Trends
- Running time (lambda) lag candle
- Other methods to represent larger scale trends?
- Moving Averages
- Slope and Curvature at scales?

#### Technical Indicators
- Fibonacci levels
- Supports and Resistance
- Candle Patterns: See [babypips](http://www.babypips.com/school/elementary/japanese-candle-sticks/)

#### Fractal Scaling
- Model market on different scales: year-days, month-hours, day-minutes
- Indicators at higher scales should project into models at lower scales

### Multi-day Time Window Training
- Train model say from 7am to 9am, but use data from multiple days. Could penalize older data in weighting scheme