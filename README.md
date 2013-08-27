bitpony
=======

bitcoin machine learning trading platform

Plan
====
1. Research into forex trading
2. Begin collecting data from exchanges. see [markets](http://bitcoincharts.com/markets/currency/USD.html)
3. Test Cycle 1
   - Bucket data, try SVM classification
   - Integration of trading algos
   - Test on data
4. Refine collection scheme
5. Test Cycle 2
   - Attribute research
   - Longer time period
   - Intermarket
6. Refine data collection

program
=======

```
  Mtgox -> Bitbucket    |   bitstamp -> Bitbucket       *Exchange API Layer* Nodejs
        |               |             |                  Independent Services
        |               |             |                  JSON communication
~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~
         \                           /                  *Database Layer* Nodejs
          \                         /           <-----   Get / Put Bitbuckets
            SubLevelDatabase Service                  |  Streams Bitbuckets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    |
                        |                             | *Data Modeling layer* Julia, C
                        V                       <-----|  Construct Models
                Machine Learning                      |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    |
                        |                             | *Predictive Trading Layer* Julia
                        V                       <-----|  Apply models and algorithmic
               Algorithmic Trading                    |  trading to new data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    |
               /        |         \                   | *Transaction Layer* Nodejs
              /         |          \                  |  Market Transactions
    MtGox Transactions  |   Bitstamp Transactions     |
~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~~~~   |
              \                    /                  | *Optimization Layer* Nodejs, Julia
               \                  /                   |  Monitor performance
                Tuning and Testing                    |  and feed into modeling
                        |                             |  and trading tuning
                        -------------------------------
```
