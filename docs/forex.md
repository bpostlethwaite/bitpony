# Forex market prediction

## Forex Trading
- Busiest trades during London Newyork overlap - 13:00 -> 17:00 UTC
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
Note, develop a system that automatically runs through 1:n indicators
and tries every combination and scores each result on a SET of predefined
training runs, using different window sizes and training lengths etc.

Eventually include a random weight trainer that randomly assigns weights
to attributes in each node and tests.

Run this stuff for a month.

Set up system so you can add new attribute data and it will begin including
it in the permutations - basically keep track of all tested permutations with
a defined attribute naming/numbering scheme so we don't test same attribute
mix twice.

Develop a smart system to do this, as this will be extremely inefficient. Say we have N indicators, we want to know if using smaller subsamples sets gives better results.
- First run with all N indicators.
- Then randomly pick X indicators and test and rank results using only those X. - Assign each indicator an accumulating rank, the number of times it has been tested and the mean rank.
- Assign to each group the Members of group and rank attained.
- Do this N/X * 100 times.
- Do groups > average(rank of members)
- Do groups < average(rank of members)
- Begin testing adding groups and individual indicators to find best feature set.
- Develop a system where adding a new indicator gets tested with known groups.
- Then begin testing using ranking as weights, add more indicators with lower weights, can we maximize testing performance or will we overfit?


#### Price signals
- Price Ratios (see masters thesis in GDrive)
- Direct Price
- Price signals from other currency pairs (test adding different combos)
- Resource Prices? Oil -> USD/CAN

#### Trends
- Running time (lambda) lag candle
- Other methods to represent larger scale trends?
- Multiple moving varied-length windows of Mean
  - value (t or t-1)
  - slope 1st derivative (t-1)
  - curvature 2nd derivative (t-2)

#### Bollinger Bands
- High and low values for calculated bollinger band

#### Standard Deviation
- Multiple moving varied-length windows of standard deviation or variance
  - value (t or t-1)
  - slope 1st derivative (t-1)
  - curvature 2nd derivative (t-2)


#### Technical Indicators
- Fibonacci levels
- Supports and Resistance


#### Fractal Scaling
- Model market on different scales: year-days, month-hours, day-minutes
- Indicators at higher scales should project into models at lower scales

#### Frequency
- Multiple moving varied-length windows of fft's
  - n-bins
  - Power Spectrum


### Multi-day Time-Consistent Window Training
- Train model say from 7am to 9am, but use data from the 7am to 9am window on multiple days. Could penalize older data in weighting scheme

### Parallel Julia
Using Julia's require, @spawn / remotecall, @everywhere etc. can run 4 SVMs on 4 processors for training.
Each processor computes classes from data, one processor allocated for hard-sell, sell etc... then performs training. Each Processor will now have generated a model. Once complete each proc waits for test data (Proc 1 creates a remote ref on each worker, once models are built workers wait on their references until datadata is available and Proc1 "put"s data into each remote ref). Test data to get individual classifications, fetch returns classification. Combine classifications to get 5 class value.
