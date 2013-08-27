bitpony
=======

bitcoin machine learning trading platform

Plan
====
1. Research into forex trading.
2. Begin collecting data from exchanges. see [markets](http://bitcoincharts.com/markets/currency/USD.html)
3. Test Cycle 1
   - Bucket data, try SVM classification
   - Integration of trading algos
4. Adjust data collection scheme
5. Test Cycle 2


program
=======


  Mtgox -> Bitbucket    |   bitstamp -> Bitbucket       *Exchange API Layer*
        |               |             |                  Independent Services
        |               |             |                  JSON communication
~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~
         \                           /                  *Database Layer*
          \                         /           <-----   Get / Put Bitbuckets
            SubLevelDatabase Service                  |  Streams Bitbuckets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    |
                        |                             | *Data Modeling layer*
                        V                       <-----|  Construct Models
                Machine Learning                      |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    |
                        |                             | *Predictive Trading Layer*
                        V                       <-----|  Apply models and algorithmic
               Algorithmic Trading                    |  trading to new data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    |
               /        |         \                   | *Transaction Layer*
              /         |          \                  |  Market Transactions
    MtGox Transactions  |   Bitstamp Transactions     |
~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~~~~   |
              \                    /                  | *Optimization Layer*
               \                  /                   |  Monitor performance
                Tuning and Testing                    |  and feed into modeling
                        |                             |
                        -------------------------------
